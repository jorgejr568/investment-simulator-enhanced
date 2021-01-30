FROM golang:1.15.7-alpine3.13 AS build
WORKDIR /app
COPY go.mod .
RUN go mod download

COPY . .

RUN go build -o investment-simulator.run main.go

FROM alpine:3.13
WORKDIR /app
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/application_default_credentials.json

RUN apk --no-cache add ca-certificates
COPY --from=build /app/investment-simulator.run .
COPY --from=build /app/application_default_credentials.json .
CMD ["./investment-simulator.run"]

