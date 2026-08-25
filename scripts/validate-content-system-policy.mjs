#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const DEFAULT_POLICY_PATH = resolve(
  SCRIPT_DIRECTORY,
  "../docs/rzifi-cinematic-payments-split-v1.policy.json",
);

const CANONICAL = Object.freeze({
  schemaVersion: 1,
  policyId: "rzifi-content-system-policy-v1",
  visualSystemId: "rzifi-cinematic-payments-split-v1",
  width: 1200,
  height: 630,
  aspectRatio: "40:21",
  orientation: "landscape",
  format: "png",
  layoutId: "left-copy-right-scene-46-54",
  textPanel: Object.freeze({ x: 0, y: 0, width: 552, height: 630 }),
  scenePanel: Object.freeze({ x: 552, y: 0, width: 648, height: 630 }),
  safeArea: Object.freeze({ left: 72, right: 48, top: 54, bottom: 48 }),
  palette: Object.freeze({
    navy: "#061119",
    ivory: "#F5F4EE",
    teal: "#22C7B6",
    amber: "#D8A552",
    muted: "#A6B0B4",
  }),
  channels: Object.freeze(["website", "linkedin", "x"]),
  headline: Object.freeze({
    minimumWords: 5,
    maximumWords: 8,
    minimumLines: 2,
    maximumLines: 4,
    case: "uppercase",
  }),
  requiredProhibitedStyles: Object.freeze([
    "sci-fi",
    "industrial",
    "gunmetal",
    "portal",
    "machine",
    "switchyard",
    "pipes",
    "futuristic control room",
    "generic dashboard",
    "mechanical gate",
    "cream checklist",
    "cream card",
  ]),
  requiredCadenceMetadata: Object.freeze([
    "cadencePolicyId",
    "timeZone",
    "targetLocalDate",
    "targetLocalTime",
    "targetPostsPerWeek",
    "maximumPostsPerLocalDay",
    "approvalMode",
  ]),
});

const CHANNEL_STATUSES = new Set([
  "draft",
  "ready",
  "queued",
  "scheduled",
  "live",
  "blocked",
  "missing",
  "failed",
]);

const APPROVAL_MODES = new Set([
  "none",
  "editorial_review",
  "exact_asset_and_caption",
]);

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasOwn(record, key) {
  return isRecord(record) && Object.prototype.hasOwnProperty.call(record, key);
}

function stableObjectEquals(actual, expected) {
  if (!isRecord(actual) || !isRecord(expected)) {
    return false;
  }

  const actualKeys = Object.keys(actual).sort();
  const expectedKeys = Object.keys(expected).sort();
  if (actualKeys.length !== expectedKeys.length) {
    return false;
  }

  return expectedKeys.every(
    (key, index) =>
      actualKeys[index] === key &&
      String(actual[key]).toUpperCase() === String(expected[key]).toUpperCase(),
  );
}

function exactStringArray(actual, expected) {
  return (
    Array.isArray(actual) &&
    actual.length === expected.length &&
    actual.every((value, index) => value === expected[index])
  );
}

function appendExactObjectErrors(errors, path, actual, expected) {
  if (!isRecord(actual)) {
    errors.push(path + " must be an object.");
    return;
  }

  for (const [key, expectedValue] of Object.entries(expected)) {
    if (actual[key] !== expectedValue) {
      errors.push(
        path +
          "." +
          key +
          " must be " +
          JSON.stringify(expectedValue) +
          "; received " +
          JSON.stringify(actual[key]) +
          ".",
      );
    }
  }

  const extraKeys = Object.keys(actual).filter(
    (key) => !Object.prototype.hasOwnProperty.call(expected, key),
  );
  if (extraKeys.length > 0) {
    errors.push(path + " contains unexpected keys: " + extraKeys.join(", ") + ".");
  }
}

export function validatePolicy(policy) {
  const errors = [];
  if (!isRecord(policy)) {
    return ["Policy must be a JSON object."];
  }

  if (policy.schemaVersion !== CANONICAL.schemaVersion) {
    errors.push("schemaVersion must remain 1.");
  }
  if (policy.policyId !== CANONICAL.policyId) {
    errors.push("policyId must remain " + CANONICAL.policyId + ".");
  }

  const visual = policy.visualSystem;
  if (!isRecord(visual)) {
    errors.push("visualSystem must be an object.");
    return errors;
  }
  if (visual.id !== CANONICAL.visualSystemId) {
    errors.push("visualSystem.id must remain " + CANONICAL.visualSystemId + ".");
  }

  const canvas = visual.canvas;
  if (!isRecord(canvas)) {
    errors.push("visualSystem.canvas must be an object.");
  } else {
    if (canvas.width !== CANONICAL.width) {
      errors.push("visualSystem.canvas.width must remain 1200.");
    }
    if (canvas.height !== CANONICAL.height) {
      errors.push("visualSystem.canvas.height must remain 630.");
    }
    if (canvas.aspectRatio !== CANONICAL.aspectRatio) {
      errors.push("visualSystem.canvas.aspectRatio must remain 40:21.");
    }
    if (canvas.orientation !== CANONICAL.orientation) {
      errors.push("visualSystem.canvas.orientation must remain landscape.");
    }
    if (canvas.format !== CANONICAL.format) {
      errors.push("visualSystem.canvas.format must remain png.");
    }
  }

  if (!stableObjectEquals(visual.palette, CANONICAL.palette)) {
    errors.push(
      "visualSystem.palette must contain only the locked navy, ivory, teal, amber, and muted values.",
    );
  }

  const layout = visual.layout;
  if (!isRecord(layout)) {
    errors.push("visualSystem.layout must be an object.");
  } else {
    if (layout.id !== CANONICAL.layoutId) {
      errors.push("visualSystem.layout.id must remain " + CANONICAL.layoutId + ".");
    }
    appendExactObjectErrors(
      errors,
      "visualSystem.layout.textPanel",
      layout.textPanel,
      CANONICAL.textPanel,
    );
    appendExactObjectErrors(
      errors,
      "visualSystem.layout.scenePanel",
      layout.scenePanel,
      CANONICAL.scenePanel,
    );
    appendExactObjectErrors(
      errors,
      "visualSystem.layout.safeArea",
      layout.safeArea,
      CANONICAL.safeArea,
    );
    if (layout.maximumSeamBlendPx !== 72) {
      errors.push("visualSystem.layout.maximumSeamBlendPx must remain 72.");
    }
    if (layout.dominantFocalPoints !== 1) {
      errors.push("visualSystem.layout.dominantFocalPoints must remain 1.");
    }
    if (layout.maximumSupportingProps !== 4) {
      errors.push("visualSystem.layout.maximumSupportingProps must remain 4.");
    }
  }

  const typography = visual.typography;
  const headline = isRecord(typography) ? typography.headline : undefined;
  if (!isRecord(typography)) {
    errors.push("visualSystem.typography must be an object.");
  } else {
    if (typography.rendering !== "deterministic_overlay") {
      errors.push(
        "visualSystem.typography.rendering must remain deterministic_overlay.",
      );
    }
    if (typography.modelGeneratedTextAllowed !== false) {
      errors.push(
        "visualSystem.typography.modelGeneratedTextAllowed must remain false.",
      );
    }
  }
  if (!isRecord(headline)) {
    errors.push("visualSystem.typography.headline must be an object.");
  } else {
    for (const [key, expectedValue] of Object.entries(CANONICAL.headline)) {
      if (headline[key] !== expectedValue) {
        errors.push(
          "visualSystem.typography.headline." +
            key +
            " must remain " +
            JSON.stringify(expectedValue) +
            ".",
        );
      }
    }
    if (
      typeof headline.family !== "string" ||
      headline.family.trim().length === 0 ||
      typeof headline.source !== "string" ||
      headline.source.trim().length === 0
    ) {
      errors.push("Headline typography must name a font family and font source.");
    }
  }

  const prohibitedStyles = visual.sceneRules?.prohibitedStyles;
  if (!Array.isArray(prohibitedStyles)) {
    errors.push("visualSystem.sceneRules.prohibitedStyles must be an array.");
  } else {
    const normalized = prohibitedStyles.map((value) =>
      String(value).trim().toLowerCase(),
    );
    for (const term of CANONICAL.requiredProhibitedStyles) {
      if (!normalized.includes(term)) {
        errors.push(
          "visualSystem.sceneRules.prohibitedStyles must retain " +
            JSON.stringify(term) +
            ".",
        );
      }
    }
  }

  const tagging = policy.companyTagging;
  if (!isRecord(tagging)) {
    errors.push("companyTagging must be an object.");
  } else {
    if (tagging.maximumTagsPerPost !== 3) {
      errors.push("companyTagging.maximumTagsPerPost must remain 3.");
    }
    if (tagging.verificationRequired !== true) {
      errors.push("companyTagging.verificationRequired must remain true.");
    }
    if (tagging.unverifiedTagBehavior !== "omit") {
      errors.push("companyTagging.unverifiedTagBehavior must remain omit.");
    }
    const requiredVerificationFields = [
      "canonicalName",
      "profileUrl",
      "evidenceUrl",
      "verifiedAt",
    ];
    if (
      !exactStringArray(
        tagging.requiredVerificationFields,
        requiredVerificationFields,
      )
    ) {
      errors.push(
        "companyTagging.requiredVerificationFields must retain the locked verification evidence fields.",
      );
    }
  }

  const distribution = policy.distribution;
  if (!isRecord(distribution)) {
    errors.push("distribution must be an object.");
    return errors;
  }
  if (!exactStringArray(distribution.supportedChannels, CANONICAL.channels)) {
    errors.push(
      "distribution.supportedChannels must be website, linkedin, and x in that order.",
    );
  }

  const assetContract = distribution.assetContract;
  if (!isRecord(assetContract)) {
    errors.push("distribution.assetContract must be an object.");
  } else {
    if (assetContract.visualSystemId !== CANONICAL.visualSystemId) {
      errors.push(
        "distribution.assetContract.visualSystemId must remain " +
          CANONICAL.visualSystemId +
          ".",
      );
    }
    if (
      assetContract.width !== CANONICAL.width ||
      assetContract.height !== CANONICAL.height ||
      assetContract.format !== CANONICAL.format
    ) {
      errors.push(
        "distribution.assetContract must require an exact 1200x630 png for every channel.",
      );
    }
    if (assetContract.requiredForEveryChannel !== true) {
      errors.push(
        "distribution.assetContract.requiredForEveryChannel must remain true.",
      );
    }
  }

  const independence = distribution.independence;
  if (!isRecord(independence)) {
    errors.push("distribution.independence must be an object.");
  } else {
    const requiredIndependence = {
      statusesArePerChannel: true,
      failureScope: "channel_only",
      crossChannelBlockingAllowed: false,
      websiteDependsOnSocialApproval: false,
      socialFailureRollsBackWebsite: false,
      rollForwardOnMissedSlot: false,
      retryRequiresCurrentApproval: true,
    };
    for (const [key, expectedValue] of Object.entries(requiredIndependence)) {
      if (independence[key] !== expectedValue) {
        errors.push(
          "distribution.independence." +
            key +
            " must remain " +
            JSON.stringify(expectedValue) +
            ".",
        );
      }
    }
  }

  const cadence = distribution.cadence;
  if (!isRecord(cadence)) {
    errors.push("distribution.cadence must be an object.");
  } else {
    if (cadence.ownership !== "declared_per_channel") {
      errors.push("distribution.cadence.ownership must remain declared_per_channel.");
    }
    if (cadence.scheduleValuesMayBeInferred !== false) {
      errors.push(
        "distribution.cadence.scheduleValuesMayBeInferred must remain false.",
      );
    }
    if (
      !exactStringArray(
        cadence.requiredMetadata,
        CANONICAL.requiredCadenceMetadata,
      )
    ) {
      errors.push(
        "distribution.cadence.requiredMetadata must retain every locked cadence field.",
      );
    }
  }

  return errors;
}

function normalizeSearchText(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeSearchText).join(" ");
  }
  if (isRecord(value)) {
    return Object.values(value).map(normalizeSearchText).join(" ");
  }
  return String(value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function countHeadlineWords(value) {
  return String(value ?? "")
    .trim()
    .split(/\s+/)
    .filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isValidTimeZone(value) {
  try {
    new Intl.DateTimeFormat("en", { timeZone: value }).format();
    return true;
  } catch {
    return false;
  }
}

function isValidLocalDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const parsed = new Date(value + "T00:00:00Z");
  return (
    !Number.isNaN(parsed.valueOf()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

function isValidLocalTime(value) {
  if (typeof value !== "string" || !/^\d{2}:\d{2}$/.test(value)) {
    return false;
  }
  const [hours, minutes] = value.split(":").map(Number);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

function validateCadenceMetadata(policy, channel, cadence, errors) {
  const path = "channels." + channel + ".cadence";
  if (!isRecord(cadence)) {
    errors.push(path + " must be an object.");
    return;
  }

  for (const field of policy.distribution.cadence.requiredMetadata) {
    if (!hasOwn(cadence, field)) {
      errors.push(path + "." + field + " is required.");
    }
  }

  if (
    typeof cadence.cadencePolicyId !== "string" ||
    cadence.cadencePolicyId.trim().length === 0
  ) {
    errors.push(path + ".cadencePolicyId must be a non-empty string.");
  }
  if (!isValidTimeZone(cadence.timeZone)) {
    errors.push(path + ".timeZone must be a valid IANA time zone.");
  }
  if (!isValidLocalDate(cadence.targetLocalDate)) {
    errors.push(path + ".targetLocalDate must be a real YYYY-MM-DD date.");
  }
  if (!isValidLocalTime(cadence.targetLocalTime)) {
    errors.push(path + ".targetLocalTime must be a real HH:MM time.");
  }

  const constraints = policy.distribution.cadence.constraints;
  if (
    !Number.isInteger(cadence.targetPostsPerWeek) ||
    cadence.targetPostsPerWeek < constraints.minimumTargetPostsPerWeek ||
    cadence.targetPostsPerWeek > constraints.maximumTargetPostsPerWeek
  ) {
    errors.push(
      path +
        ".targetPostsPerWeek must be an integer from " +
        constraints.minimumTargetPostsPerWeek +
        " to " +
        constraints.maximumTargetPostsPerWeek +
        ".",
    );
  }
  if (
    !Number.isInteger(cadence.maximumPostsPerLocalDay) ||
    cadence.maximumPostsPerLocalDay <
      constraints.minimumPostsPerLocalDay ||
    cadence.maximumPostsPerLocalDay > constraints.maximumPostsPerLocalDay
  ) {
    errors.push(
      path +
        ".maximumPostsPerLocalDay must be an integer from " +
        constraints.minimumPostsPerLocalDay +
        " to " +
        constraints.maximumPostsPerLocalDay +
        ".",
    );
  }
  if (!APPROVAL_MODES.has(cadence.approvalMode)) {
    errors.push(
      path +
        ".approvalMode must be one of " +
        Array.from(APPROVAL_MODES).join(", ") +
        ".",
    );
  }
}

export function validatePublicationManifest(policy, manifest) {
  const errors = validatePolicy(policy).map((error) => "policy: " + error);
  if (!isRecord(manifest)) {
    errors.push("Manifest must be a JSON object.");
    return errors;
  }

  if (hasOwn(manifest, "status")) {
    errors.push(
      "A top-level shared status is forbidden; status belongs to each channel.",
    );
  }
  if (hasOwn(manifest, "cadence") || hasOwn(manifest, "schedule")) {
    errors.push(
      "A top-level shared cadence or schedule is forbidden; cadence belongs to each channel.",
    );
  }

  const creative = manifest.creative;
  if (!isRecord(creative)) {
    errors.push("creative must be an object.");
  } else {
    if (creative.visualSystemId !== CANONICAL.visualSystemId) {
      errors.push(
        "creative.visualSystemId must be " + CANONICAL.visualSystemId + ".",
      );
    }
    if (creative.layoutId !== CANONICAL.layoutId) {
      errors.push("creative.layoutId must be " + CANONICAL.layoutId + ".");
    }

    const canvas = creative.canvas;
    if (
      !isRecord(canvas) ||
      canvas.width !== CANONICAL.width ||
      canvas.height !== CANONICAL.height ||
      canvas.format !== CANONICAL.format
    ) {
      errors.push("creative.canvas must be an exact 1200x630 png.");
    }

    if (!stableObjectEquals(creative.palette, CANONICAL.palette)) {
      errors.push("creative.palette must exactly match the locked five-color palette.");
    }

    const headline = String(creative.headline ?? "").trim();
    const wordCount = countHeadlineWords(headline);
    if (
      wordCount < policy.visualSystem.typography.headline.minimumWords ||
      wordCount > policy.visualSystem.typography.headline.maximumWords
    ) {
      errors.push(
        "creative.headline must contain 5 to 8 words; received " +
          wordCount +
          ".",
      );
    }
    if (headline !== headline.toUpperCase()) {
      errors.push("creative.headline must be uppercase.");
    }
    if (
      !Number.isInteger(creative.headlineLines) ||
      creative.headlineLines <
        policy.visualSystem.typography.headline.minimumLines ||
      creative.headlineLines >
        policy.visualSystem.typography.headline.maximumLines
    ) {
      errors.push("creative.headlineLines must be an integer from 2 to 4.");
    }
    if (creative.textRendering !== "deterministic_overlay") {
      errors.push("creative.textRendering must be deterministic_overlay.");
    }
    if (creative.dominantFocalPoints !== 1) {
      errors.push("creative.dominantFocalPoints must be exactly 1.");
    }
    if (
      !Number.isInteger(creative.supportingProps) ||
      creative.supportingProps < 0 ||
      creative.supportingProps >
        policy.visualSystem.layout.maximumSupportingProps
    ) {
      errors.push("creative.supportingProps must be an integer from 0 to 4.");
    }

    const treatment = normalizeSearchText(creative.treatment);
    for (const required of ["cinematic", "photoreal", "editorial"]) {
      if (!treatment.includes(required)) {
        errors.push(
          "creative.treatment must explicitly include " +
            JSON.stringify(required) +
            ".",
        );
      }
    }

    const primarySubject = normalizeSearchText(creative.primarySubject);
    const allowedSubjects = policy.visualSystem.sceneRules.allowedPrimarySubjects;
    if (
      !allowedSubjects.some((subject) =>
        primarySubject.includes(normalizeSearchText(subject)),
      )
    ) {
      errors.push(
        "creative.primarySubject must name one allowed real payment subject.",
      );
    }

    const artDirection = normalizeSearchText({
      prompt: creative.generationPrompt,
      style: creative.styleKeywords,
      treatment: creative.treatment,
    });
    for (const prohibited of policy.visualSystem.sceneRules.prohibitedStyles) {
      if (artDirection.includes(normalizeSearchText(prohibited))) {
        errors.push(
          "creative art direction contains prohibited style " +
            JSON.stringify(prohibited) +
            ".",
        );
      }
    }
  }

  const companyTags = manifest.companyTags;
  if (!Array.isArray(companyTags)) {
    errors.push("companyTags must be an array, including when it is empty.");
  } else {
    if (companyTags.length > policy.companyTagging.maximumTagsPerPost) {
      errors.push("companyTags may contain at most three verified organizations.");
    }
    for (const [index, tag] of companyTags.entries()) {
      const path = "companyTags[" + index + "]";
      if (!isRecord(tag)) {
        errors.push(path + " must be an object.");
        continue;
      }
      if (tag.verified !== true) {
        errors.push(path + ".verified must be true; otherwise omit the tag.");
      }
      for (const field of policy.companyTagging.requiredVerificationFields) {
        if (
          typeof tag[field] !== "string" ||
          tag[field].trim().length === 0
        ) {
          errors.push(path + "." + field + " must be a non-empty string.");
        }
      }
      if (!isHttpsUrl(tag.profileUrl)) {
        errors.push(path + ".profileUrl must be an HTTPS URL.");
      }
      if (!isHttpsUrl(tag.evidenceUrl)) {
        errors.push(path + ".evidenceUrl must be an HTTPS URL.");
      }
      if (Number.isNaN(Date.parse(tag.verifiedAt))) {
        errors.push(path + ".verifiedAt must be an ISO-compatible date.");
      }
    }
  }

  const channels = manifest.channels;
  if (!isRecord(channels)) {
    errors.push("channels must be an object.");
    return errors;
  }

  const actualChannels = Object.keys(channels).sort();
  const expectedChannels = [...policy.distribution.supportedChannels].sort();
  if (!exactStringArray(actualChannels, expectedChannels)) {
    errors.push(
      "channels must contain exactly website, linkedin, and x; received " +
        actualChannels.join(", ") +
        ".",
    );
  }

  for (const channel of policy.distribution.supportedChannels) {
    const entry = channels[channel];
    const path = "channels." + channel;
    if (!isRecord(entry)) {
      errors.push(path + " must be an object.");
      continue;
    }
    if (typeof entry.enabled !== "boolean") {
      errors.push(path + ".enabled must be a boolean.");
    }
    if (!CHANNEL_STATUSES.has(entry.status)) {
      errors.push(
        path +
          ".status must be one of " +
          Array.from(CHANNEL_STATUSES).join(", ") +
          ".",
      );
    }
    if (entry.failureScope !== "channel_only") {
      errors.push(path + ".failureScope must be channel_only.");
    }
    if (!Array.isArray(entry.dependsOnChannels)) {
      errors.push(path + ".dependsOnChannels must be an array.");
    } else if (entry.dependsOnChannels.length !== 0) {
      errors.push(path + ".dependsOnChannels must remain empty.");
    }

    const asset = entry.asset;
    if (
      !isRecord(asset) ||
      asset.visualSystemId !== CANONICAL.visualSystemId ||
      asset.width !== CANONICAL.width ||
      asset.height !== CANONICAL.height ||
      asset.format !== CANONICAL.format
    ) {
      errors.push(
        path +
          ".asset must use " +
          CANONICAL.visualSystemId +
          " as an exact 1200x630 png.",
      );
    }

    validateCadenceMetadata(policy, channel, entry.cadence, errors);
  }

  return errors;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createValidFixture(policy) {
  const makeChannel = (channel, approvalMode) => ({
    enabled: true,
    status: "ready",
    failureScope: "channel_only",
    dependsOnChannels: [],
    asset: {
      visualSystemId: policy.visualSystem.id,
      width: policy.visualSystem.canvas.width,
      height: policy.visualSystem.canvas.height,
      format: policy.visualSystem.canvas.format,
    },
    cadence: {
      cadencePolicyId: channel + "-declared-cadence-v1",
      timeZone: "Asia/Dubai",
      targetLocalDate: "2026-08-26",
      targetLocalTime: "08:45",
      targetPostsPerWeek: 7,
      maximumPostsPerLocalDay: 1,
      approvalMode,
    },
  });

  return {
    manifestVersion: 1,
    creative: {
      visualSystemId: policy.visualSystem.id,
      layoutId: policy.visualSystem.layout.id,
      canvas: {
        width: policy.visualSystem.canvas.width,
        height: policy.visualSystem.canvas.height,
        format: policy.visualSystem.canvas.format,
      },
      palette: clone(policy.visualSystem.palette),
      headline: "PAYMENT RESILIENCE IS A PRODUCT CONTROL",
      headlineLines: 3,
      textRendering: "deterministic_overlay",
      dominantFocalPoints: 1,
      supportingProps: 3,
      treatment: ["cinematic", "photoreal", "editorial"],
      primarySubject: "payment terminal",
      generationPrompt:
        "A credible merchant payment terminal in a cinematic photoreal editorial scene.",
      styleKeywords: ["payments", "merchant", "operational"],
    },
    companyTags: [
      {
        canonicalName: "Example Payments Company",
        profileUrl: "https://www.linkedin.com/company/example-payments-company/",
        evidenceUrl: "https://example.com/payments-announcement",
        verifiedAt: "2026-08-25T08:00:00Z",
        verified: true,
      },
    ],
    channels: {
      website: makeChannel("website", "editorial_review"),
      linkedin: makeChannel("linkedin", "exact_asset_and_caption"),
      x: makeChannel("x", "exact_asset_and_caption"),
    },
  };
}

function assertSelfTestFailure(name, policy, fixture, mutate, expectedText) {
  const candidate = clone(fixture);
  mutate(candidate);
  const errors = validatePublicationManifest(policy, candidate);
  if (!errors.some((error) => error.includes(expectedText))) {
    throw new Error(
      "Self-test " +
        JSON.stringify(name) +
        " did not produce expected error containing " +
        JSON.stringify(expectedText) +
        ". Received: " +
        JSON.stringify(errors),
    );
  }
}

function runSelfTests(policy) {
  const fixture = createValidFixture(policy);
  const validErrors = validatePublicationManifest(policy, fixture);
  if (validErrors.length > 0) {
    throw new Error(
      "Valid fixture failed policy validation: " + validErrors.join(" | "),
    );
  }

  const driftedPolicy = clone(policy);
  driftedPolicy.visualSystem.canvas.width = 1080;
  const driftErrors = validatePolicy(driftedPolicy);
  if (!driftErrors.some((error) => error.includes("width must remain 1200"))) {
    throw new Error("Policy drift self-test did not reject a 1080px canvas.");
  }

  const cases = [
    [
      "portrait asset",
      (value) => {
        value.channels.linkedin.asset.width = 1080;
        value.channels.linkedin.asset.height = 1350;
      },
      "exact 1200x630 png",
    ],
    [
      "palette drift",
      (value) => {
        value.creative.palette.ivory = "#FFF7E7";
      },
      "locked five-color palette",
    ],
    [
      "headline too short",
      (value) => {
        value.creative.headline = "PAYMENTS NEED CONTROL";
      },
      "5 to 8 words",
    ],
    [
      "model rendered text",
      (value) => {
        value.creative.textRendering = "generated_in_image";
      },
      "deterministic_overlay",
    ],
    [
      "industrial visual drift",
      (value) => {
        value.creative.generationPrompt =
          "An industrial gunmetal payment switchyard with pipes.";
      },
      "prohibited style",
    ],
    [
      "four company tags",
      (value) => {
        value.companyTags.push(clone(value.companyTags[0]));
        value.companyTags.push(clone(value.companyTags[0]));
        value.companyTags.push(clone(value.companyTags[0]));
      },
      "at most three verified organizations",
    ],
    [
      "unverified company tag",
      (value) => {
        value.companyTags[0].verified = false;
      },
      "verified must be true",
    ],
    [
      "missing channel",
      (value) => {
        delete value.channels.x;
      },
      "channels must contain exactly",
    ],
    [
      "missing cadence field",
      (value) => {
        delete value.channels.website.cadence.targetLocalTime;
      },
      "targetLocalTime is required",
    ],
    [
      "cross-channel failure",
      (value) => {
        value.channels.linkedin.failureScope = "all_channels";
      },
      "failureScope must be channel_only",
    ],
    [
      "cross-channel dependency",
      (value) => {
        value.channels.website.dependsOnChannels = ["linkedin"];
      },
      "dependsOnChannels must remain empty",
    ],
    [
      "shared schedule",
      (value) => {
        value.schedule = { targetLocalTime: "08:45" };
      },
      "top-level shared cadence or schedule is forbidden",
    ],
  ];

  for (const [name, mutate, expectedText] of cases) {
    assertSelfTestFailure(name, policy, fixture, mutate, expectedText);
  }

  return 2 + cases.length;
}

function parseArguments(argv) {
  const options = {
    policyPath: DEFAULT_POLICY_PATH,
    manifestPath: undefined,
    selfTest: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--policy") {
      index += 1;
      if (!argv[index]) {
        throw new Error("--policy requires a file path.");
      }
      options.policyPath = resolve(process.cwd(), argv[index]);
    } else if (argument === "--manifest") {
      index += 1;
      if (!argv[index]) {
        throw new Error("--manifest requires a file path.");
      }
      options.manifestPath = resolve(process.cwd(), argv[index]);
    } else if (argument === "--self-test") {
      options.selfTest = true;
    } else if (argument === "--help" || argument === "-h") {
      options.help = true;
    } else {
      throw new Error("Unknown argument: " + argument);
    }
  }

  return options;
}

async function readJson(path) {
  const source = await readFile(path, "utf8");
  try {
    return JSON.parse(source);
  } catch (error) {
    throw new Error(path + " is not valid JSON: " + error.message);
  }
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    console.log(
      [
        "Usage:",
        "  node scripts/validate-content-system-policy.mjs",
        "  node scripts/validate-content-system-policy.mjs --self-test",
        "  node scripts/validate-content-system-policy.mjs --manifest path/to/manifest.json",
        "  node scripts/validate-content-system-policy.mjs --policy path/to/policy.json",
      ].join("\n"),
    );
    return;
  }

  const policy = await readJson(options.policyPath);
  const policyErrors = validatePolicy(policy);
  if (policyErrors.length > 0) {
    console.error("Content system policy validation failed:");
    for (const error of policyErrors) {
      console.error("- " + error);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Policy valid: " + options.policyPath);

  if (options.selfTest) {
    const assertions = runSelfTests(policy);
    console.log("Self-test passed: " + assertions + " regression assertions.");
  }

  if (options.manifestPath) {
    const manifest = await readJson(options.manifestPath);
    const manifestErrors = validatePublicationManifest(policy, manifest);
    if (manifestErrors.length > 0) {
      console.error("Publication manifest validation failed:");
      for (const error of manifestErrors) {
        console.error("- " + error);
      }
      process.exitCode = 1;
      return;
    }
    console.log("Publication manifest valid: " + options.manifestPath);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
