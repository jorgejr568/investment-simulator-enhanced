package handlers

import (
	"github.com/fasthttp/router"
	"github.com/jorgejr568/investment-simulator/models/responses"
	"github.com/valyala/fasthttp"
)

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

type HealthHandler struct {
}

func (handler HealthHandler) SetupRoutes(r *router.Router) {
	r.GET("/health", handler.HealthCheck)
}

func (handler HealthHandler) HealthCheck(ctx *fasthttp.RequestCtx) {
	response := &responses.HealthCheckResponse{
		Status: responses.HealthCheckStatusOnline,
	}
	responses.JSON(ctx, response)
}
