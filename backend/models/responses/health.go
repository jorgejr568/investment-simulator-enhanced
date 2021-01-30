package responses

type HealthCheckStatus string

const (
	HealthCheckStatusOnline HealthCheckStatus = "online"
)

type HealthCheckResponse struct {
	Status HealthCheckStatus `json:"status"`
}
