import { api } from 'cfg'

export interface SimulationPartial {
  id: string
  amount: number
  rentability: number
}

export interface Simulation {
  id: string
  title: string
  initial_amount: number
  duration_in_months: number
  monthly_amount: number
  monthly_rentability: number
  annual_growth: number
  partials: SimulationPartial[]
  created_at: string
  updated_at: string
}

export interface SimulationCalculationStats {
  total_amount: number
  invested_amount: number
  interest_amount: number
  invested_percentage: number
  interest_percentage: number
}

export interface SimulationCalculationPartial {
  total_amount: number
  invested_amount: number
  interest_amount: number
  invested_percentage: number
  interest_percentage: number
}

export interface SimulationCalculation {
  simulation: Simulation
  stats: SimulationCalculationStats
  partials: SimulationCalculationPartial[]
}

export interface SimulationsClientInterface {
  list(): Promise<Simulation[]>
  find(id: string): Promise<Simulation>
  calculate(id: string): Promise<SimulationCalculation>
  update(id: string, simulation: Simulation): Promise<Simulation>
  delete(id: string): Promise<Simulation>
}

export class SimulationsClient implements SimulationsClientInterface {
  normalizeSimulationPartial(data): SimulationPartial {
    return <SimulationPartial>{
      ...data,
    }
  }
  normalizeSimulationCalculationPartial(data): SimulationCalculationPartial {
    return <SimulationCalculationPartial>{
      ...data,
    }
  }
  normalizeSimulationCalculationStats(data): SimulationCalculationStats {
    return <SimulationCalculationStats>{
      ...data,
    }
  }
  normalizeSimulation(data): Simulation {
    return <Simulation>{
      ...data,
      partials: data.partials.map((partial) =>
        this.normalizeSimulationPartial(partial)
      ),
    }
  }
  normalizeSimulationCalculation(data): SimulationCalculation {
    return <SimulationCalculation>{
      simulation: this.normalizeSimulation(data.simulation),
      stats: this.normalizeSimulationCalculationStats(data.stats),
      partials: data.partials.map((partial) =>
        this.normalizeSimulationCalculationPartial(partial)
      ),
    }
  }

  delete(id: string): Promise<Simulation> {
    return Promise.resolve(undefined)
  }

  async find(id: string): Promise<Simulation> {
    const {
      data: { data },
    } = await api.get(`/simulations/${id}`)
    return this.normalizeSimulation(data)
  }

  async calculate(id: string): Promise<SimulationCalculation> {
    const {
      data: { data },
    } = await api.get(`/simulations/${id}/calculate`)
    return this.normalizeSimulationCalculation(data)
  }

  async list(): Promise<Simulation[]> {
    const {
      data: { data },
    } = await api.get('/simulations')
    return data.map((simulation) => this.normalizeSimulation(simulation))
  }

  update(id: string, simulation: Simulation): Promise<Simulation> {
    return Promise.resolve(undefined)
  }
}

export const client = new SimulationsClient()
