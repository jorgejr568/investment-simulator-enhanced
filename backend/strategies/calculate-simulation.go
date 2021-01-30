package strategies

import (
	"math"

	"github.com/rs/zerolog/log"

	"github.com/jorgejr568/investment-simulator/models"
)

func CalculateSimulation(simulation *models.Simulation) *models.SimulationCalculation {

	totalAmount, totalInvested, totalInterest := simulation.InitialAmount, simulation.InitialAmount, 0
	calculatePartials := make([]models.SimulationCalculationPartial, 0, len(simulation.Partials))
	for _, partial := range simulation.Partials {
		log.Debug().Int("total", totalAmount).Int("invested", totalInvested).Int("interest", totalInterest).Msg("Amounts")
		totalInterest += percentage(totalAmount, partial.Rentability)
		totalInvested += partial.Amount
		totalAmount = totalInvested + totalInterest

		calculatePartial := models.SimulationCalculationPartial{
			TotalAmount:        totalAmount,
			InvestedAmount:     totalInvested,
			InterestAmount:     totalInterest,
			InvestedPercentage: percentageOf(totalAmount, totalInvested),
			InterestPercentage: percentageOf(totalAmount, totalInterest),
		}

		calculatePartials = append(calculatePartials, calculatePartial)
	}

	return &models.SimulationCalculation{
		Simulation: simulation,
		Stats: &models.SimulationCalculationStats{
			TotalAmount:        totalAmount,
			InvestedAmount:     totalInvested,
			InterestAmount:     totalInterest,
			InvestedPercentage: percentageOf(totalAmount, totalInvested),
			InterestPercentage: percentageOf(totalAmount, totalInterest),
		},
		Partials: &calculatePartials,
	}
}

func percentageOf(total, partial int) int {
	return int(math.Round(float64(partial) / float64(total) * 10000))
}

func percentage(amount, multiply int) int {
	return int(math.Round(float64(amount) * float64(multiply) / 10000))
}
