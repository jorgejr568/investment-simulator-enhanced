package simulation

import (
	"github.com/jorgejr568/investment-simulator/models"
	"github.com/jorgejr568/investment-simulator/models/requests"
)

type Repository interface {
	GetAll() ([]*models.Simulation, error)
	Save(request *requests.SimulationCreateRequest) (*models.Simulation, error)
	Show(id string) (*models.Simulation, error)
	Update(request *requests.SimulationUpdateRequest, id string) (*models.Simulation, error)
	Calculate(id string) (*models.SimulationCalculation, error)
	Delete(id string) error
}
