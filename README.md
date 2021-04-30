[![docker-image-version](https://img.shields.io/docker/v/julb/http-url-playlist.svg?sort=semver)](https://hub.docker.com/r/julb/http-url-playlist)
[![docker-image-size](https://img.shields.io/docker/image-size/julb/http-url-playlist.svg?sort=semver)](https://hub.docker.com/r/julb/http-url-playlist)
[![docker-pulls](https://img.shields.io/docker/pulls/julb/http-url-playlist.svg)](https://hub.docker.com/r/julb/http-url-playlist)

# http-url-playlist

## Description

The application is a simple Web application which provides a way to display a first URL within a `iframe` (full page), then after `rotationDelay` ms, display the next URL, etc... undefinitely.

It is very useful for monitoring screens when you need to display dashboards sequentially.

The application expects a `config.json` file like this:

```json
{
    "rotationDelay": 5000,
    "urls": ["http://url-1", "http://url-2", "http://url-3"]
}
```

The file should be mounted under `/usr/share/nginx/html/config.json` in the container.

## Starts the container

-   Run container as root:

```bash
$ docker run -ti \                   \
    -p 8080:80                              \
    -v $(pwd)/examples/config.json:/usr/share/nginx/html/config.json  \
    julb/http-url-playlist:latest
```

## Helm chart

A [Helm chart](https://github.com/julb/helm-charts/blob/main/julb/http-url-playlist/README.md) is available to install this runtime.

## Contributing

This project is totally open source and contributors are welcome.

When you submit a PR, please ensure that the python code is well formatted and linted.

```
$ make install.dependencies
$ make format
$ make lint
```
