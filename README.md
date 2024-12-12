# Fluxo completo de desenvolvimento com LocalStack e Serverless Offline:

## Iniciar o LocalStack no Docker: Certifique-se de que o LocalStack está em execução:

```
docker run --rm -it -p 4566:4566 -p 4510-4559:4510-4559 localstack/localstack
```

## Deploy para o LocalStack: Execute:

```
serverless deploy --stage local
```

## Rodar localmente com serverless offline: Use o comando:

```
serverless offline --stage local
```

Isso permite simular um ambiente AWS completo em sua máquina local com integração ao LocalStack e suporte ao TypeScript.
