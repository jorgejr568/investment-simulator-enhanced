package requests

import (
	"time"

	"github.com/google/uuid"
	"github.com/jorgejr568/investment-simulator/models"
)

type SimulationCreateRequest struct {
	Title              string `json:"title" firestore:"title"`
	InitialAmount      int    `json:"initial_amount" firestore:"initial_amount"`
	DurationInMonths   int    `json:"duration_in_months" firestore:"duration_in_months"`
	MonthlyAmount      int    `json:"monthly_amount" firestore:"monthly_amount"`
	MonthlyRentability int    `json:"monthly_rentability" firestore:"monthly_rentability"`
	AnnualGrowth       int    `json:"annual_growth" firestore:"annual_growth"`
}

func (request SimulationCreateRequest) ToSimulation() *models.Simulation {
	simulation := &models.Simulation{
		ID:                 uuid.New().String(),
		Title:              request.Title,
		InitialAmount:      request.InitialAmount,
		DurationInMonths:   request.DurationInMonths,
		MonthlyAmount:      request.MonthlyAmount,
		MonthlyRentability: request.MonthlyRentability,
		AnnualGrowth:       request.AnnualGrowth,
		CreatedAt:          time.Now(),
		UpdatedAt:          time.Now(),
	}
	simulation.Partials = request.toSimulationPartials(simulation)

	return simulation
}

func (request SimulationCreateRequest) toSimulationPartials(simulation *models.Simulation) []models.SimulationPartial {
	partials := make([]models.SimulationPartial, 0, simulation.DurationInMonths)
	amount := simulation.MonthlyAmount
	for i := 1; i <= simulation.DurationInMonths; i++ {
		if i%12 == 0 {
			amount += simulation.AnnualGrowth
		}

		partial := models.SimulationPartial{
			ID:          uuid.New().String(),
			Amount:      amount,
			Rentability: simulation.MonthlyRentability,
		}
		partials = append(partials, partial)
	}
	return partials
}

func (request SimulationCreateRequest) Validate() string {
	var validationError string
	return validationError
}
