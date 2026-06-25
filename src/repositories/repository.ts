// Puerto: contrato de persistencia para cualquier entidad con id
export interface Repository<T extends { id: string }> {
    findAll(): Promise<T[]>
    findOne(id: string): Promise<T | undefined>
    addOne(item: T): Promise<T>
    updateOne(id: string, updates: Partial<T>): Promise<T | null>
    deleteOne(id: string): Promise<T | null>
}