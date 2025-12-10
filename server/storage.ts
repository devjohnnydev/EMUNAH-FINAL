import { 
  type User, type InsertUser,
  type Product, type InsertProduct,
  type Client, type InsertClient,
  type Quote, type InsertQuote,
  type Order, type InsertOrder
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Clients
  getClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  getClientByPhone(phone: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined>;

  // Quotes
  getQuotes(filters?: { status?: string; startDate?: Date; endDate?: Date }): Promise<Quote[]>;
  getQuote(id: string): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  updateQuote(id: string, quote: Partial<InsertQuote>): Promise<Quote | undefined>;
  deleteQuote(id: string): Promise<boolean>;

  // Orders
  getOrders(filters?: { status?: string; startDate?: Date; endDate?: Date }): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, order: Partial<InsertOrder>): Promise<Order | undefined>;
  deleteOrder(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private clients: Map<string, Client>;
  private quotes: Map<string, Quote>;
  private orders: Map<string, Order>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.clients = new Map();
    this.quotes = new Map();
    this.orders = new Map();
    
    // Seed with initial data
    this.seedInitialData();
  }

  private seedInitialData() {
    // Create initial products
    const initialProducts: Product[] = [
      {
        id: randomUUID(),
        name: 'Camiseta EMUNHAH Básica',
        slug: 'camiseta-emunhah-basica',
        price: '89.90',
        description: 'Camiseta de algodão premium com o logo minimalista da EMUNHAH. Conforto e propósito em uma peça única.',
        category: 'Roupas',
        image: '/generated_images/t-shirt_mockup_with_logo.png',
        stock: 50,
        active: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'Caneca Fé Diária',
        slug: 'caneca-fe-diaria',
        price: '45.90',
        description: 'Caneca de cerâmica perfeita para seu café ou chá. Comece o dia lembrando do seu propósito.',
        category: 'Acessórios',
        image: '/generated_images/mug_mockup_with_logo.png',
        stock: 30,
        active: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'Camiseta Versículo',
        slug: 'camiseta-versiculo',
        price: '99.90',
        description: 'Camiseta com estampa tipográfica inspirada em versículos bíblicos. Design moderno e sóbrio.',
        category: 'Roupas',
        image: '/generated_images/t-shirt_mockup_with_logo.png',
        stock: 40,
        active: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'Ecobag Propósito',
        slug: 'ecobag-proposito',
        price: '35.90',
        description: 'Sacola ecológica resistente para o dia a dia. Leve a mensagem por onde for.',
        category: 'Acessórios',
        image: '/generated_images/mug_mockup_with_logo.png',
        stock: 60,
        active: true,
        createdAt: new Date(),
      }
    ];

    initialProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(p => p.slug === slug);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct,
      stock: insertProduct.stock ?? null,
      active: insertProduct.active ?? null,
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updated = { ...product, ...updateData };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  // Clients
  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  async getClient(id: string): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async getClientByPhone(phone: string): Promise<Client | undefined> {
    return Array.from(this.clients.values()).find(c => c.phone === phone);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = randomUUID();
    const client: Client = { 
      ...insertClient,
      email: insertClient.email ?? null,
      address: insertClient.address ?? null,
      city: insertClient.city ?? null,
      state: insertClient.state ?? null,
      zipCode: insertClient.zipCode ?? null,
      id,
      createdAt: new Date()
    };
    this.clients.set(id, client);
    return client;
  }

  async updateClient(id: string, updateData: Partial<InsertClient>): Promise<Client | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;
    
    const updated = { ...client, ...updateData };
    this.clients.set(id, updated);
    return updated;
  }

  // Quotes
  async getQuotes(filters?: { status?: string; startDate?: Date; endDate?: Date }): Promise<Quote[]> {
    let quotes = Array.from(this.quotes.values());
    
    if (filters?.status) {
      quotes = quotes.filter(q => q.status === filters.status);
    }
    if (filters?.startDate) {
      quotes = quotes.filter(q => q.createdAt && q.createdAt >= filters.startDate!);
    }
    if (filters?.endDate) {
      quotes = quotes.filter(q => q.createdAt && q.createdAt <= filters.endDate!);
    }
    
    return quotes.sort((a, b) => {
      const dateA = a.createdAt?.getTime() || 0;
      const dateB = b.createdAt?.getTime() || 0;
      return dateB - dateA;
    });
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = randomUUID();
    const quote: Quote = { 
      ...insertQuote,
      status: insertQuote.status || 'pending',
      bibleVerse: insertQuote.bibleVerse ?? null,
      id,
      createdAt: new Date()
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async updateQuote(id: string, updateData: Partial<InsertQuote>): Promise<Quote | undefined> {
    const quote = this.quotes.get(id);
    if (!quote) return undefined;
    
    const updated = { ...quote, ...updateData };
    this.quotes.set(id, updated);
    return updated;
  }

  async deleteQuote(id: string): Promise<boolean> {
    return this.quotes.delete(id);
  }

  // Orders
  async getOrders(filters?: { status?: string; startDate?: Date; endDate?: Date }): Promise<Order[]> {
    let orders = Array.from(this.orders.values());
    
    if (filters?.status) {
      orders = orders.filter(o => o.status === filters.status);
    }
    if (filters?.startDate) {
      orders = orders.filter(o => o.createdAt && o.createdAt >= filters.startDate!);
    }
    if (filters?.endDate) {
      orders = orders.filter(o => o.createdAt && o.createdAt <= filters.endDate!);
    }
    
    return orders.sort((a, b) => {
      const dateA = a.createdAt?.getTime() || 0;
      const dateB = b.createdAt?.getTime() || 0;
      return dateB - dateA;
    });
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder,
      status: insertOrder.status || 'pending',
      clientAddress: insertOrder.clientAddress ?? null,
      clientCity: insertOrder.clientCity ?? null,
      clientState: insertOrder.clientState ?? null,
      clientZipCode: insertOrder.clientZipCode ?? null,
      shippingCost: insertOrder.shippingCost ?? "0",
      trackingCode: insertOrder.trackingCode ?? null,
      paymentMethod: insertOrder.paymentMethod ?? null,
      quoteId: insertOrder.quoteId ?? null,
      id,
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: string, updateData: Partial<InsertOrder>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updated = { ...order, ...updateData };
    this.orders.set(id, updated);
    return updated;
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.orders.delete(id);
  }
}

export const storage = new MemStorage();
