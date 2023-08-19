# Instruções para Executar uma Aplicação Expo React Native

## Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

Node.js e npm: O Expo e o React Native são construídos sobre o Node.js. Você pode baixar e instalar o Node.js em nodejs.org.

Expo CLI: Para interagir com projetos Expo, você precisa do Expo CLI. Instale-o globalmente usando o seguinte comando no terminal:
npm install -g expo-cli

Expo Go (opcional, mas recomendado): O Expo Go é um aplicativo que permite executar aplicativos Expo em um dispositivo físico para testar seu aplicativo em tempo real. Você pode baixá-lo na App Store (iOS) ou Google Play Store (Android).

## Passos para Executar a Aplicação
Clone o Repositório ou Crie um Projeto: Comece criando um novo projeto Expo ou clonando um repositório existente.

Navegue para o Diretório do Projeto: Use o terminal para navegar até o diretório raiz do projeto:
cd nome-do-seu-projeto

Instale as Dependências: Execute o seguinte comando para instalar todas as dependências listadas no arquivo package.json:
npm install

Inicie a Aplicação: Use o Expo CLI para iniciar a aplicação. Isso abrirá automaticamente uma página no seu navegador com um código QR e informações sobre como executar o aplicativo no simulador ou em um dispositivo físico:
expo start

Ao teclar w no terminal, irá abrir a versão web no navegador

Ao teclar a no terminal, irá abrir a versão android

Opções para Executar o Aplicativo Android:
No Simulador: Se você tiver um emulador iOS ou Android configurado, você pode clicar nos links "Run on iOS simulator" ou "Run on Android device/emulator" na página Expo aberta no navegador.
No Dispositivo Físico: Se estiver usando o Expo Go, abra o aplicativo Expo Go no seu dispositivo e escaneie o código QR exibido na página Expo no navegador.
Teste e Explore: Depois de executar o aplicativo, você poderá ver as mudanças em tempo real conforme faz edições no código. Experimente as diferentes funcionalidades e navegue pelo aplicativo para testá-lo.
