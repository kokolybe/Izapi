#!/usr/bin/env bash

# Télécharger Chrome Portable
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O /tmp/google-chrome.deb

# Extraire le fichier dans un répertoire local
dpkg-deb -x /tmp/google-chrome.deb /tmp/chrome

# Déplacer les fichiers extraits dans un dossier accessible par l'application
mv /tmp/chrome/opt/google/chrome /opt/chrome
