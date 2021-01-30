FROM golang:1.15.7-alpine3.13 AS build
WORKDIR /app
COPY go.mod .
RUN go mod download

COPY . .

RUN go build -o investment-simulator.run main.go

FROM alpine:3.13
WORKDIR /app

RUN apk --no-cache add ca-certificates
COPY --from=build /app/investment-simulator.run .
CMD ["./investment-simulator.run"]

