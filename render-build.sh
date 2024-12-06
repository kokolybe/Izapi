#!/usr/bin/env bash
# Installer les dépendances nécessaires
apt-get update
apt-get install -y wget unzip libnss3 libxss1 libasound2 libatk1.0-0 libatk-bridge2.0-0 libcups2 fonts-liberation libappindicator3-1 libgbm-dev

# Télécharger et installer Chrome si nécessaire
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
dpkg -i google-chrome-stable_current_amd64.deb || apt-get -f install -y
