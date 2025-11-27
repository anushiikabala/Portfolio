#!/bin/bash
gunicorn app:app --timeout 300 --workers 3 --bind 0.0.0.0:$PORT
