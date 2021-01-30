package simulation

import (
	"context"

	"cloud.google.com/go/firestore"
)

func NewRepository(ctx context.Context, c *firestore.Client) Repository {
	return &FirestoreRepository{
		ctx:                    ctx,
		firestore:              c,
		collectionName:         "simulations",
		partialsCollectionName: "simulations_partials",
	}
}
