#!/usr/bin/env python3
"""Download rzifi.com pages + assets for UI/UX audit."""
import sys, os, time, gzip, io
import urllib.request

OUT = os.path.dirname(os.path.abspath(__file__))
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"

def fetch(url, name=None, head=False):
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept": "text/html,application/xhtml+xml,*/*;q=0.8",
        "Accept-Encoding": "gzip",
    }, method="HEAD" if head else "GET")
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            raw = b"" if head else r.read()
            if r.headers.get("Content-Encoding") == "gzip" and raw:
                raw = gzip.decompress(raw)
            dt = time.time() - t0
            clen = r.headers.get("Content-Length", "?")
            ctype = r.headers.get("Content-Type", "?")
            cache = r.headers.get("Cache-Control", "-")
            if name and not head:
                with open(os.path.join(OUT, name), "wb") as f:
                    f.write(raw)
            print(f"{r.status} {url} | dl={len(raw)}B hdrlen={clen} type={ctype} cache={cache} t={dt:.2f}s")
            return raw
    except Exception as e:
        print(f"ERR {url} -> {e}")
        return b""

if __name__ == "__main__":
    pages = {
        "index.html": "https://rzifi.com/",
        "blog.html": "https://rzifi.com/blog/",
        "essay.html": "https://rzifi.com/blog/authorization-rate-merchant-pnl-operating-model/",
        "product-work.html": "https://rzifi.com/product-work/",
        "resume.html": "https://rzifi.com/resume/",
        "contact.html": "https://rzifi.com/contact/",
        "for.html": "https://rzifi.com/for/",
    }
    for name, url in pages.items():
        fetch(url, name)
