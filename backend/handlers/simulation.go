package handlers

import (
	"context"
	"encoding/json"

	"github.com/google/uuid"

	"github.com/jorgejr568/investment-simulator/services/simulation"
	"github.com/rs/zerolog/log"

	"github.com/jorgejr568/investment-simulator/models/requests"

	"cloud.google.com/go/firestore"
	"github.com/fasthttp/router"
	"github.com/jorgejr568/investment-simulator/models/responses"
	"github.com/valyala/fasthttp"
)

func NewSimulationHandler(ctx context.Context, c *firestore.Client) *SimulationHandler {
	return &SimulationHandler{
		ctx:       ctx,
		firestore: c,
		service:   simulation.NewService(ctx, c),
	}
}

type SimulationHandler struct {
	ctx       context.Context
	firestore *firestore.Client
	service   simulation.Service
}

func (handler SimulationHandler) SetupRoutes(r *router.Router) {
	r.GET("/simulations", handler.GetAllSimulations)
	r.POST("/simulations", handler.CreateSimulation)
	r.GET("/simulations/{id}/calculate", handler.CalculateSimulation)
	r.GET("/simulations/{id}", handler.ShowSimulation)
	r.PUT("/simulations/{id}", handler.UpdateSimulation)
	r.DELETE("/simulations/{id}", handler.DeleteSimulation)
}

func (handler SimulationHandler) CreateSimulation(ctx *fasthttp.RequestCtx) {
	var request requests.SimulationCreateRequest
	if err := json.Unmarshal(ctx.PostBody(), &request); err != nil {
		log.Error().Err(err).Msg("Could not unmarshal PostBody")
		responses.BadRequest(ctx)
		return
	}

	if err := request.Validate(); err != "" {
		log.Info().Str("err", err).Msg("Validation failed")
		responses.ValidationFails(ctx, err)
		return
	}

	response, err := handler.service.Save(&request)
	if err != nil {
		log.Error().Err(err).Msg("Could not save simulation")
		responses.InternalServerError(ctx)
		return
	}
	responses.JSON(ctx, response)
	ctx.SetStatusCode(fasthttp.StatusCreated)
}

func (handler SimulationHandler) UpdateSimulation(ctx *fasthttp.RequestCtx) {
	id := ctx.UserValue("id").(string)
	if _, err := uuid.Parse(id); err != nil {
		log.Error().Err(err).Msg("Invalid UUID")
		responses.BadRequest(ctx)
		return
	}

	var request requests.SimulationUpdateRequest
	if err := json.Unmarshal(ctx.PostBody(), &request); err != nil {
		log.Error().Err(err).Msg("Could not unmarshal PostBody")
		responses.BadRequest(ctx)
		return
	}

	if err := request.Validate(); err != "" {
		log.Info().Str("err", err).Msg("Validation failed")
		responses.ValidationFails(ctx, err)
		return
	}

	response, err := handler.service.Update(&request, id)
	if err != nil {
		log.Error().Err(err).Msg("Could not update simulation")
		responses.InternalServerError(ctx)
		return
	}
	responses.JSON(ctx, response)
}

func (handler SimulationHandler) ShowSimulation(ctx *fasthttp.RequestCtx) {
	id := ctx.UserValue("id").(string)
	if _, err := uuid.Parse(id); err != nil {
		log.Error().Err(err).Msg("Invalid UUID")
		responses.BadRequest(ctx)
		return
	}

	response, err := handler.service.Show(id)
	if err != nil {
		log.Error().Err(err).Msg("Could not find simulation")
		responses.NotFound(ctx)
		return
	}

	responses.JSON(ctx, response)
}

func (handler SimulationHandler) GetAllSimulations(ctx *fasthttp.RequestCtx) {
	response, err := handler.service.GetAll()
	if err != nil {
		log.Error().Err(err).Msg("Could not list simulations")
		responses.NotFound(ctx)
		return
	}

	responses.JSON(ctx, response)
}

func (handler SimulationHandler) CalculateSimulation(ctx *fasthttp.RequestCtx) {
	id := ctx.UserValue("id").(string)
	if _, err := uuid.Parse(id); err != nil {
		log.Error().Err(err).Msg("Invalid UUID")
		responses.BadRequest(ctx)
		return
	}

	response, err := handler.service.Calculate(id)
	if err != nil {
		log.Error().Err(err).Msg("Could not calculate/find simulation")
		responses.NotFound(ctx)
		return
	}

	responses.JSON(ctx, response)
}

func (handler SimulationHandler) DeleteSimulation(ctx *fasthttp.RequestCtx) {
	id := ctx.UserValue("id").(string)
	if _, err := uuid.Parse(id); err != nil {
		log.Error().Err(err).Msg("Invalid UUID")
		responses.BadRequest(ctx)
		return
	}

	err := handler.service.Delete(id)
	if err != nil {
		log.Error().Err(err).Msg("Could not delete simulation")
		responses.NotFound(ctx)
		return
	}

	responses.NoContent(ctx)
}
