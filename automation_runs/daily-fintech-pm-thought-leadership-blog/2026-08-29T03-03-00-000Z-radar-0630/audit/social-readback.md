# Social Readback

Checked at: 2026-08-29T13:20:00Z
Mode: read-only
Mutation attempted: no

## Buffer

Result: blocked

The read-only Buffer GraphQL snapshot first failed inside the sandbox with DNS resolution blocked for `api.buffer.com`. The same read-only snapshot was retried with network access and Buffer returned:

```text
Access token is not valid
```

## Consequence

- X scheduling was not attempted.
- LinkedIn Buffer release, retry, backfill or duplicate creation was not attempted.
- Native LinkedIn scheduling was not attempted.
- Current Buffer scheduled/sent/error state remains unavailable until credentials are refreshed.

Exact next action: refresh or reconnect Buffer credentials, then rerun read-only X and LinkedIn reconciliation before any social mutation.
