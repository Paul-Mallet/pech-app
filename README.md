# pech-app-mobile

Le repository de la partie web de pech-mobile

## prerequis

### Installer nvm

Si vous avez pas nvm d'installé, faites le, ca permet de changer
de version de node très facilement

```sh
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
source ~/.bashrc
```

ensuite

```
nvm install 23.3.0
```

```
nvm use 23.3.0
```

si vous voulez mettre cette version par défaut

```
vm alias default 23.3.0
```

## télécharger les dépendances

```sh
npm install
```

## pour lancer le projet

```
npm run start
```

ca va permettre de lancer le serveur de dev Expo, puis pour pouvoir avoir
un rendu en temps réel du développement:

- telecharger `expo go` sur le store de votre téléphone
- scanner le QrCode

et voilà, normalement c'est tout bon, si vous avez des problèmes
n'hésitez pas à me contacter, c'est Brobit

Le choix de la version de Node.js est basée sur celle de mon pc portable,
ca pourra être modifiée dans le futur, et vous n'avez pas besoin de vm
à l'école ca fonctionne bien normalement.
