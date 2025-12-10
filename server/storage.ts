import { 
  type User, type InsertUser,
  type Product, type InsertProduct,
  type Client, type InsertClient,
  type Quote, type InsertQuote,
  type Order, type InsertOrder,
  users, products, clients, quotes, orders
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  getClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  getClientByPhone(phone: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined>;

  getQuotes(filters?: { status?: string; startDate?: Date; endDate?: Date }): Promise<Quote[]>;
  getQuote(id: string): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  updateQuote(id: string, quote: Partial<InsertQuote>): Promise<Quote | undefined>;
  deleteQuote(id: string): Promise<boolean>;

  getOrders(filters?: { status?: string; startDate?: Date; endDate?: Date }): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, order: Partial<InsertOrder>): Promise<Order | undefined>;
  deleteOrder(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.seedInitialData();
  }

  private async seedInitialData() {
    const existingProducts = await db.select().from(products).limit(1);
    if (existingProducts.length > 0) return;

    const initialProducts: InsertProduct[] = [
      {
        name: 'Camiseta EMUNHAH Básica',
        slug: 'camiseta-emunhah-basica',
        price: '89.90',
        description: 'Camiseta de algodão premium com o logo minimalista da EMUNHAH. Conforto e propósito em uma peça única.',
        category: 'Roupas',
        image: '/generated_images/t-shirt_mockup_with_logo.png',
        stock: 50,
        active: true,
      },
      {
        name: 'Caneca Fé Diária',
        slug: 'caneca-fe-diaria',
        price: '45.90',
        description: 'Caneca de cerâmica perfeita para seu café ou chá. Comece o dia lembrando do seu propósito.',
        category: 'Acessórios',
        image: '/generated_images/mug_mockup_with_logo.png',
        stock: 30,
        active: true,
      },
      {
        name: 'Camiseta Versículo',
        slug: 'camiseta-versiculo',
        price: '99.90',
        description: 'Camiseta com estampa tipográfica inspirada em versículos bíblicos. Design moderno e sóbrio.',
        category: 'Roupas',
        image: '/generated_images/t-shirt_mockup_with_logo.png',
        stock: 40,
        active: true,
      },
      {
        name: 'Ecobag Propósito',
        slug: 'ecobag-proposito',
        price: '35.90',
        description: 'Sacola ecológica resistente para o dia a dia. Leve a mensagem por onde for.',
        category: 'Acessórios',
        image: '/generated_images/mug_mockup_with_logo.png',
        stock: 60,
        active: true,
      }
    ];

    for (const product of initialProducts) {
      await db.insert(products).values(product);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async getProducts(): Promise<Product[]> {
    return db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.slug, slug));
    return result[0];
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  async updateProduct(id: string, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await db.update(products).set(updateData).where(eq(products.id, id)).returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  }

  async getClients(): Promise<Client[]> {
    return db.select().from(clients);
  }

  async getClient(id: string): Promise<Client | undefined> {
    const result = await db.select().from(clients).where(eq(clients.id, id));
    return result[0];
  }

  async getClientByPhone(phone: string): Promise<Client | undefined> {
    const result = await db.select().from(clients).where(eq(clients.phone, phone));
    return result[0];
  }

  async createClient(client: InsertClient): Promise<Client> {
    const result = await db.insert(clients).values(client).returning();
    return result[0];
  }

  async updateClient(id: string, updateData: Partial<InsertClient>): Promise<Client | undefined> {
    const result = await db.update(clients).set(updateData).where(eq(clients.id, id)).returning();
    return result[0];
  }

  async getQuotes(filters?: { status?: string; startDate?: Date; endDate?: Date }): Promise<Quote[]> {
    let query = db.select().from(quotes);
    
    if (filters?.status) {
      query = query.where(eq(quotes.status, filters.status)) as any;
    }
    
    return query;
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    const result = await db.select().from(quotes).where(eq(quotes.id, id));
    return result[0];
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    const result = await db.insert(quotes).values(quote).returning();
    return result[0];
  }

  async updateQuote(id: string, updateData: Partial<InsertQuote>): Promise<Quote | undefined> {
    const result = await db.update(quotes).set(updateData).where(eq(quotes.id, id)).returning();
    return result[0];
  }

  async deleteQuote(id: string): Promise<boolean> {
    const result = await db.delete(quotes).where(eq(quotes.id, id)).returning();
    return result.length > 0;
  }

  async getOrders(filters?: { status?: string; startDate?: Date; endDate?: Date }): Promise<Order[]> {
    let query = db.select().from(orders);
    
    if (filters?.status) {
      query = query.where(eq(orders.status, filters.status)) as any;
    }
    
    return query;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id));
    return result[0];
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values(order).returning();
    return result[0];
  }

  async updateOrder(id: string, updateData: Partial<InsertOrder>): Promise<Order | undefined> {
    const result = await db.update(orders).set(updateData).where(eq(orders.id, id)).returning();
    return result[0];
  }

  async deleteOrder(id: string): Promise<boolean> {
    const result = await db.delete(orders).where(eq(orders.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
