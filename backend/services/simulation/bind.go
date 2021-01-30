package simulation

import (
	"context"

	"github.com/jorgejr568/investment-simulator/repositories/simulation"

	"cloud.google.com/go/firestore"
)

func NewService(ctx context.Context, c *firestore.Client) Service {
	return &FirestoreService{
		ctx:                  ctx,
		firestore:            c,
		simulationRepository: simulation.NewRepository(ctx, c),
	}
}
