package simulation

import (
	"context"

	"github.com/rs/zerolog/log"

	"github.com/jorgejr568/investment-simulator/repositories/simulation"

	"github.com/jorgejr568/investment-simulator/models/requests"
	"github.com/jorgejr568/investment-simulator/models/responses"

	"cloud.google.com/go/firestore"
)

type FirestoreService struct {
	ctx                  context.Context
	firestore            *firestore.Client
	simulationRepository simulation.Repository
}

func (service FirestoreService) Save(request *requests.SimulationCreateRequest) (*responses.SimulationCreateResponse, error) {
	model, err := service.simulationRepository.Save(request)
	if err != nil {
		log.Error().Err(err).Msg("Could not save simulation")
		return nil, err
	}

	return responses.NewSimulationCreateResponse(model), nil
}

func (service FirestoreService) Show(id string) (*responses.ShowSimulationResponse, error) {
	model, err := service.simulationRepository.Show(id)
	if err != nil {
		log.Error().Err(err).Str("ID", id).Msg("Could not find simulation")
		return nil, err
	}

	return responses.NewShowSimulationResponse(model), nil
}
func (service FirestoreService) Update(request *requests.SimulationUpdateRequest, id string) (*responses.SimulationUpdateResponse, error) {
	model, err := service.simulationRepository.Update(request, id)
	if err != nil {
		log.Error().Err(err).Msg("Could not save simulation")
		return nil, err
	}

	return responses.NewSimulationUpdateResponse(model), nil
}
func (service FirestoreService) Delete(id string) error {
	if err := service.simulationRepository.Delete(id); err != nil {
		log.Error().Err(err).Str("ID", id).Msg("Could not delete simulation")
		return err
	}
	return nil
}

func (service FirestoreService) Calculate(id string) (*responses.CalculateSimulationResponse, error) {
	model, err := service.simulationRepository.Calculate(id)
	if err != nil {
		log.Error().Err(err).Str("ID", id).Msg("Could not find simulation")
		return nil, err
	}
	return responses.NewCalculateSimulationResponse(model), nil
}

func (service FirestoreService) GetAll() (*responses.GetAllSimulationResponse, error) {
	models, err := service.simulationRepository.GetAll()
	if err != nil {
		log.Error().Err(err).Msg("Could not list simulations")
		return nil, err
	}
	return responses.NewGetAllSimulationResponse(models), nil
}
