---
name: build-real-estate
description: Scaffolds a high-converting real estate showcase website featuring interactive floorplan previews, amenity filters, unit inventory grids, and inquiry modals.
---

# Objective
Scaffold a luxury property development or villa showcase website with filterable unit inventories, high-res floor plan zoom lightboxes, and a pinned viewing scheduler drawer.

# Workflow Instructions

1. **Populate Inventory Contracts**:
   - Write unit details (bedrooms, sqft, priceRange, floorPlanUrl) into `src/data/units.ts`.

2. **Build Interactive Components**:
   - Construct bedroom category filters (2BHK, 3BHK, Penthouse, Villa).
   - Implement `FloorPlanModal` using `@radix-ui/react-dialog` with high-resolution image zoom.
   - Embed Embla Carousel photo sliders for luxury interior showcases.

3. **Lead Capture Integration**:
   - Place a persistent "Book Private Viewing" Floating Action Button (FAB).
   - Open appointment scheduling drawer connected to `submitContactForm`.
