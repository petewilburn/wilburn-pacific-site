import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // === API ROUTES ===

  // Services
  app.get(api.services.list.path, async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  // Projects
  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  // Inquiries
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // === SEED DATA ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    console.log("Seeding services...");
    await storage.createService({
      title: "Crane Design & Engineering",
      description: "Custom design of overhead bridge cranes, gantries, and monorails.",
      category: "Engineering",
      features: ["PE-stamped drawings", "FEA reports", "CMAA classification"],
      icon: "PenTool"
    });
    await storage.createService({
      title: "Controls & Automation",
      description: "Modernizing aging cranes with VFDs and anti-sway technology.",
      category: "Modernization",
      features: ["Electrical schematics", "PLC programming", "Wireless integration"],
      icon: "Cpu"
    });
    await storage.createService({
      title: "Structural Fabrication",
      description: "Precision fabrication of runway beams, box girders, and end trucks.",
      category: "Fabrication",
      features: ["AWS D1.1 certified welds", "NDT reports"],
      icon: "Hammer"
    });
    await storage.createService({
      title: "Rigging & Field Services",
      description: "Installation of overhead systems, load testing, and runway alignment.",
      category: "Field Services",
      features: ["Critical lift plans", "Laser alignment", "Load test certification"],
      icon: "Anchor"
    });
  }

  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    console.log("Seeding projects...");
    await storage.createProject({
      title: "Riverport Crane Retrofit",
      location: "Riverport Industrial Park, WA",
      challenge: "Aging 50-ton bridge crane with fatigue cracks and obsolete controls.",
      solution: "FEA analysis, cover plate reinforcement, Magnetek VFD system.",
      outcome: "Zero safety incidents; 200% positioning accuracy; 15-year life extension.",
      metrics: { "Safety Incidents": "Zero", "Life Extension": "15 Years" },
      imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80"
    });
    await storage.createProject({
      title: "Mill #4 Custom Gantry",
      location: "Inland Paper Mill, OR",
      challenge: "Lift 20-ton rolls in 18ft headroom.",
      solution: "Low-profile double-girder gantry with nested hoist trolley.",
      outcome: "Achieved lift height with 6 inches clearance; 40% reduced cycle time.",
      metrics: { "Clearance": "6 inches", "Cycle Time": "-40%" },
      imageUrl: "https://images.unsplash.com/photo-1581094794329-cd1361daca69?auto=format&fit=crop&q=80"
    });
    await storage.createProject({
      title: "Marine Jib Installation",
      location: "Dockside",
      challenge: "Heavy-lift jib with corrosion resistance.",
      solution: "Corrosion-resistant coating and wireless telemetry.",
      outcome: "Successful installation.",
      metrics: { "Environment": "Marine", "Control": "Wireless" },
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80"
    });
  }
}
