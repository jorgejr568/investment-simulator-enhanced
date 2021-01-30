package requests

import (
	"time"

	"github.com/google/uuid"
	"github.com/jorgejr568/investment-simulator/models"
)

type SimulationUpdateRequest struct {
	Title              string `json:"title" firestore:"title,omitempty" `
	InitialAmount      int    `json:"initial_amount" firestore:"initial_amount,omitempty"`
	DurationInMonths   int    `json:"duration_in_months" firestore:"duration_in_months,omitempty"`
	MonthlyAmount      int    `json:"monthly_amount" firestore:"monthly_amount,omitempty"`
	MonthlyRentability int    `json:"monthly_rentability" firestore:"monthly_rentability,omitempty"`
	AnnualGrowth       int    `json:"annual_growth" firestore:"annual_growth,omitempty"`
}

func (request SimulationUpdateRequest) ToSimulation(id string) *models.Simulation {
	simulation := &models.Simulation{
		ID:                 id,
		Title:              request.Title,
		InitialAmount:      request.InitialAmount,
		DurationInMonths:   request.DurationInMonths,
		MonthlyAmount:      request.MonthlyAmount,
		MonthlyRentability: request.MonthlyRentability,
		AnnualGrowth:       request.AnnualGrowth,
		UpdatedAt:          time.Now(),
	}
	simulation.Partials = request.toSimulationPartials(simulation)

	return simulation
}

func (request SimulationUpdateRequest) toSimulationPartials(simulation *models.Simulation) []models.SimulationPartial {
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

func (request SimulationUpdateRequest) Validate() string {
	var validationError string
	return validationError
}
