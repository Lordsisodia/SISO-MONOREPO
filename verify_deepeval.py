#!/usr/bin/env python3
"""Minimal import check for deepeval installation."""

import importlib
import sys

try:
    module = importlib.import_module("deepeval")
except Exception as exc:  # pragma: no cover
    sys.stderr.write(f"deepeval import failed: {exc}\n")
    sys.exit(1)
else:
    print(f"deepeval loaded successfully (version: {module.__version__})")
