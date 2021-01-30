package models

import "time"

type Simulation struct {
	ID                 string              `json:"id" firestore:"id"`
	Title              string              `json:"title" firestore:"title"`
	InitialAmount      int                 `json:"initial_amount" firestore:"initial_amount"`
	DurationInMonths   int                 `json:"duration_in_months" firestore:"duration_in_months"`
	MonthlyAmount      int                 `json:"monthly_amount" firestore:"monthly_amount"`
	MonthlyRentability int                 `json:"monthly_rentability" firestore:"monthly_rentability"`
	AnnualGrowth       int                 `json:"annual_growth" firestore:"annual_growth"`
	Partials           []SimulationPartial `json:"partials" firestore:"partials"`
	CreatedAt          time.Time           `json:"created_at" firestore:"created_at,omitempty"`
	UpdatedAt          time.Time           `json:"updated_at" firestore:"updated_at,omitempty"`
}

type SimulationPartial struct {
	ID          string `json:"id" firestore:"id"`
	Amount      int    `json:"amount" firestore:"amount"`
	Rentability int    `json:"rentability" firestore:"rentability"`
}

type SimulationCalculationStats struct {
	TotalAmount        int `json:"total_amount"`
	InvestedAmount     int `json:"invested_amount"`
	InterestAmount     int `json:"interest_amount"`
	InvestedPercentage int `json:"invested_percentage"`
	InterestPercentage int `json:"interest_percentage"`
}

type SimulationCalculationPartial struct {
	TotalAmount        int `json:"total_amount"`
	InvestedAmount     int `json:"invested_amount"`
	InterestAmount     int `json:"interest_amount"`
	InvestedPercentage int `json:"invested_percentage"`
	InterestPercentage int `json:"interest_percentage"`
}

type SimulationCalculation struct {
	Simulation *Simulation                     `json:"simulation"`
	Stats      *SimulationCalculationStats     `json:"stats"`
	Partials   *[]SimulationCalculationPartial `json:"partials"`
}
