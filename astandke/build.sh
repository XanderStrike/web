#!/bin/bash

html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype index-unminified.html -o index.html

docker build -t xanderstrike/web:astandke .
