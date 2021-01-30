package responses

import "github.com/jorgejr568/investment-simulator/models"

type SimulationCreateResponse struct {
	Data *models.Simulation `json:"data"`
}

func NewSimulationCreateResponse(simulation *models.Simulation) *SimulationCreateResponse {
	return &SimulationCreateResponse{
		Data: simulation,
	}
}

type SimulationUpdateResponse struct {
	Data *models.Simulation `json:"data"`
}

func NewSimulationUpdateResponse(simulation *models.Simulation) *SimulationUpdateResponse {
	return &SimulationUpdateResponse{
		Data: simulation,
	}
}

type ShowSimulationResponse struct {
	Data *models.Simulation `json:"data"`
}

func NewShowSimulationResponse(simulation *models.Simulation) *ShowSimulationResponse {
	return &ShowSimulationResponse{
		Data: simulation,
	}
}

type GetAllSimulationResponse struct {
	Data []*models.Simulation `json:"data"`
}

func NewGetAllSimulationResponse(simulations []*models.Simulation) *GetAllSimulationResponse {
	return &GetAllSimulationResponse{
		Data: simulations,
	}
}

type CalculateSimulationResponse struct {
	Data *models.SimulationCalculation `json:"data"`
}

func NewCalculateSimulationResponse(simulation *models.SimulationCalculation) *CalculateSimulationResponse {
	return &CalculateSimulationResponse{
		Data: simulation,
	}
}
