package simulation

import (
	"context"

	"google.golang.org/api/iterator"

	"github.com/jorgejr568/investment-simulator/strategies"

	"github.com/rs/zerolog/log"

	"github.com/jorgejr568/investment-simulator/models"
	"github.com/jorgejr568/investment-simulator/models/requests"

	"cloud.google.com/go/firestore"
)

type FirestoreRepository struct {
	ctx                    context.Context
	firestore              *firestore.Client
	collectionName         string
	partialsCollectionName string
}

func (repository FirestoreRepository) Save(request *requests.SimulationCreateRequest) (*models.Simulation, error) {
	model := request.ToSimulation()
	doc := repository.firestore.Collection(repository.collectionName).Doc(model.ID)
	if _, err := doc.Create(repository.ctx, model); err != nil {
		log.Error().Err(err).Msg("Could not create simulation on firestore")
		return nil, err
	}

	return model, nil
}
func (repository FirestoreRepository) Show(id string) (*models.Simulation, error) {
	doc, err := repository.firestore.Collection(repository.collectionName).Doc(id).Get(repository.ctx)
	if err != nil {
		log.Error().Err(err).Str("ID", id).Msg("Could not find simulation")
		return nil, err
	}

	var simulation models.Simulation
	if err := doc.DataTo(&simulation); err != nil {
		log.Error().Err(err).Msg("Could not decode simulation from doc")
		return nil, err
	}

	return &simulation, nil
}
func (repository FirestoreRepository) Update(request *requests.SimulationUpdateRequest, id string) (*models.Simulation, error) {
	model := request.ToSimulation(id)
	doc := repository.firestore.Collection(repository.collectionName).Doc(model.ID)
	if _, err := doc.Set(repository.ctx, model); err != nil {
		log.Error().Err(err).Msg("Could not update simulation on firestore")
		return nil, err
	}

	return model, nil
}
func (repository FirestoreRepository) Calculate(id string) (*models.SimulationCalculation, error) {
	model, err := repository.Show(id)
	if err != nil {
		log.Error().Err(err).Msg("Could not find simulation on firestore")
		return nil, err
	}

	return strategies.CalculateSimulation(model), nil
}
func (repository FirestoreRepository) Delete(id string) error {
	_, err := repository.firestore.Collection(repository.collectionName).Doc(id).Delete(repository.ctx)
	if err != nil {
		log.Error().Err(err).Str("ID", id).Msg("Could not delete simulation")
		return err
	}
	return nil
}

func (repository FirestoreRepository) GetAll() ([]*models.Simulation, error) {
	docs := repository.firestore.Collection(repository.collectionName).Documents(repository.ctx)
	simulations := make([]*models.Simulation, 0)
	for {
		doc, err := docs.Next()

		if err == iterator.Done {
			break
		}

		if err != nil {
			log.Error().Err(err).Msg("Error iterating through docs")
			return nil, err
		}
		var simulation models.Simulation
		if err := doc.DataTo(&simulation); err != nil {
			log.Error().Err(err).Msg("Error parsing data to simulation")
			return nil, err
		}

		simulations = append(simulations, &simulation)
	}

	return simulations, nil
}
