# How to launch locally?

The easiest way to start is by using Docker compose:

`docker compose up` - The service will be launched on port `3000`.

API endpoints are listed in [api-specification.yaml](./api-specification.yaml)

An Example of usage:

`curl -X 'GET' -i 'http://localhost:3000/customers/10002/trailers'`

List requests are also return `x-paging-*` headers with pagination information.