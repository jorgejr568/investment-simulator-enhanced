package simulation

import (
	"github.com/jorgejr568/investment-simulator/models/requests"
	"github.com/jorgejr568/investment-simulator/models/responses"
)

type Service interface {
	GetAll() (*responses.GetAllSimulationResponse, error)
	Save(request *requests.SimulationCreateRequest) (*responses.SimulationCreateResponse, error)
	Show(id string) (*responses.ShowSimulationResponse, error)
	Calculate(id string) (*responses.CalculateSimulationResponse, error)
	Update(request *requests.SimulationUpdateRequest, id string) (*responses.SimulationUpdateResponse, error)
	Delete(id string) error
}
