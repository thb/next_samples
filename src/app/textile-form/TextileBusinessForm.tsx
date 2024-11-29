"use client"

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

// Define TypeScript interfaces
interface Category {
  id: number;
  name: string;
  subcategories?: Category[];
}

// Define the data structures
const markets: Category[] = [
  {
    id: 2,
    name: 'Clothing',
    subcategories: [
      {
        id: 56,
        name: 'Accessories',
        subcategories: [
          { id: 57, name: 'Caps, Scarves, Gloves' },
          { id: 60, name: 'Ties, Bow Ties' },
          { id: 58, name: 'Stoles, Scarves, Shawls' },
          { id: 59, name: 'Handkerchiefs, Pouches' },
        ],
      },
      {
        id: 53,
        name: 'Footwear Items',
        subcategories: [
          { id: 55, name: 'Stockings, Tights' },
          { id: 54, name: 'Socks' },
        ],
      },
      { id: 52, name: 'Beachwear' },
      { id: 43, name: 'Baby Care (0-2 years)' },
      {
        id: 48,
        name: 'Lingerie-Corset',
        subcategories: [
          { id: 49, name: 'Day Lingerie' },
          { id: 50, name: 'Night Lingerie / Homewear' },
        ],
      },
      { id: 42, name: "Children's Wear (2-14 years)" },
      {
        id: 29,
        name: "Women's Wear",
        subcategories: [
          { id: 33, name: 'Blouses' },
          { id: 31, name: 'Skirts, Dresses' },
          { id: 32, name: 'Pants' },
          { id: 30, name: 'Sleeved Garments' },
          { id: 34, name: 'Pullovers, Vests, Cardigans' },
          { id: 35, name: 'Tops' },
        ],
      },
      {
        id: 36,
        name: "Men's Wear",
        subcategories: [
          { id: 39, name: 'Shirts, Shirtlets' },
          { id: 38, name: 'Pants' },
          { id: 37, name: 'Sleeved Garments' },
          { id: 40, name: 'Pullovers, Vests, Cardigans' },
          { id: 41, name: 'T-shirts' },
        ],
      },
      { id: 44, name: 'Childcare Products' },
      { id: 51, name: "Men's Underwear" },
      { id: 61, name: 'Promotional Clothing' },
      {
        id: 45,
        name: 'Sportswear',
        subcategories: [
          { id: 46, name: 'Anoraks, Jackets' },
          { id: 47, name: 'Jogging Pants, Sweatshirts' },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Home Textiles',
    subcategories: [
      {
        id: 65,
        name: 'Bedding Items',
        subcategories: [
          { id: 67, name: 'Duvets, Comforters' },
          { id: 66, name: 'Blankets, Throws' },
          { id: 68, name: 'Pillows, Bolster Pillows' },
        ],
      },
      {
        id: 72,
        name: 'Bath and Toilet Linen',
        subcategories: [
          { id: 74, name: 'Bathrobes' },
          { id: 73, name: 'Towels, Washcloths, Bath Mats' },
        ],
      },
      {
        id: 69,
        name: 'Table and Kitchen Linen',
        subcategories: [
          { id: 71, name: 'Kitchen Gloves, Pot Holders' },
          {
            id: 70,
            name: 'Tablecloths, Table Napkins, Dish Towels, Table Runners, Placemats',
          },
        ],
      },
      {
        id: 62,
        name: 'Flat Linen',
        subcategories: [
          { id: 64, name: 'Mattress Pads' },
          { id: 63, name: 'Sheets, Duvet Covers, Pillowcases' },
        ],
      },
      { id: 81, name: 'Rugs and Carpets' },
      {
        id: 75,
        name: 'Decorative Textiles',
        subcategories: [
          { id: 78, name: 'Sofa Covers, Chair Covers' },
          { id: 80, name: 'Wall Coverings' },
          { id: 77, name: 'Curtains' },
          { id: 79, name: 'Blinds' },
          { id: 76, name: 'Sheer Curtains' },
        ],
      },
    ],
  },
  {
    id: 1,
    name: 'Technical Textiles',
    subcategories: [
      { id: 4, name: 'Agriculture, Fishing' },
      { id: 5, name: 'Construction & Building' },
      { id: 6, name: 'Packaging' },
      { id: 7, name: 'Environment' },
      { id: 8, name: 'Geotextile & Civil Engineering' },
      {
        id: 11,
        name: 'Hygiene & Medical',
        subcategories: [
          { id: 12, name: 'Personal Care (Orthoses, Compression Stockings, ...)' },
          { id: 13, name: 'Cosmetotextiles' },
          { id: 14, name: 'Hygiene (Wiping...)' },
          {
            id: 15,
            name: 'Medical (Operating Rooms and Wards, Hospital Garments, Dressings, Bandages and Compresses, Implants)',
          },
        ],
      },
      {
        id: 9,
        name: 'Industry',
        subcategories: [
          { id: 10, name: 'Filtration, Belts...' },
        ],
      },
      {
        id: 16,
        name: 'Protection & Safety',
        subcategories: [
          { id: 17, name: 'Balaclavas, Gloves, Masks' },
          { id: 18, name: 'Shoes' },
          { id: 19, name: 'Protective Clothing' },
          { id: 20, name: 'Workwear' },
        ],
      },
      {
        id: 21,
        name: 'Sports & Leisure',
        subcategories: [
          { id: 22, name: 'Sports Articles' },
          { id: 23, name: 'Canopies, Sails, and Tents' },
        ],
      },
      {
        id: 24,
        name: 'Transportation',
        subcategories: [
          { id: 25, name: 'Aeronautics/Space' },
          { id: 26, name: 'Automobile' },
          { id: 27, name: 'Railway' },
          { id: 28, name: 'Maritime' },
        ],
      },
    ],
  },
  { id: 82, name: 'Other' },
];

const materials: Category[] = [
  {
    id: 2,
    name: 'Artificial Fibers',
    subcategories: [
      { id: 23, name: 'Acetate' },
      { id: 22, name: 'Cupro' },
      { id: 20, name: 'Lyocell' },
      { id: 21, name: 'Modal' },
      { id: 25, name: 'Protein-based' },
      { id: 24, name: 'Triacetate' },
      { id: 19, name: 'Viscose' },
    ],
  },
  { id: 46, name: 'Bio Fibers' },
  { id: 48, name: 'Certified Fibers' },
  { id: 47, name: 'Recycled Fibers' },
  {
    id: 3,
    name: 'Synthetic Fibers',
    subcategories: [
      { id: 30, name: 'Acrylic' },
      { id: 37, name: 'Aramid' },
      { id: 41, name: 'Other Synthetic Fibers (Melamine, Polycapramide, Polyimide, Trivinyl, Vinylal...)' },
      { id: 45, name: 'Basalt' },
      { id: 43, name: 'Carbon' },
      { id: 44, name: 'Ceramic' },
      { id: 32, name: 'Chlorofiber' },
      { id: 34, name: 'Elastane' },
      { id: 38, name: 'Elastodiène' },
      { id: 39, name: 'Elastolefine' },
      { id: 40, name: 'Elastomultiester' },
      { id: 33, name: 'Fluorofiber' },
      { id: 31, name: 'Modacrylic' },
      { id: 27, name: 'Polyamide' },
      { id: 26, name: 'Polyester' },
      { id: 28, name: 'Polyethylene' },
      { id: 36, name: 'Polylactide' },
      { id: 29, name: 'Polypropylene' },
      { id: 35, name: 'Polyurethane' },
      { id: 42, name: 'Glass' },
    ],
  },
  {
    id: 1,
    name: 'Natural Fibers',
    subcategories: [
      { id: 16, name: 'Alpaca' },
      { id: 15, name: 'Angora' },
      { id: 10, name: 'Other Hard Fibers (Abaca, Alfa, Coco, Gorse, Henequen, Maguey, Sisal, Sunn...)' },
      { id: 13, name: 'Cashmere' },
      { id: 9, name: 'Capoc' }, // If 'Capoc' is a specific term, consider a note
      { id: 6, name: 'Hemp' },
      { id: 4, name: 'Cotton' },
      { id: 7, name: 'Jute' },
      { id: 11, name: 'Wool' },
      { id: 5, name: 'Linen' },
      { id: 18, name: 'Metal (Steel, Aluminum, Silver, Copper, Gold...)' },
      { id: 14, name: 'Mohair' },
      { id: 17, name: 'Animal Hair or Bristles (Cashgora, Beaver, Camel, Horse, Guanaco, Llama, Otter, Vicuña, Yak...)' },
      { id: 8, name: 'Ramie' },
      { id: 12, name: 'Silk' },
    ],
  },
];

const activities: Category[] = [
  { id: 1, name: 'Fiber Production' },
  { id: 2, name: 'Combing' },
  {
    id: 3,
    name: 'Spinning',
    subcategories: [
      { id: 6, name: 'Carded' },
      { id: 8, name: 'Fancy' },
      { id: 4, name: 'Short Fibers' },
      { id: 5, name: 'Long Fibers (Combed)' },
      { id: 7, name: 'Open-end' },
    ],
  },
  {
    id: 9,
    name: 'Yarn Transformation',
    subcategories: [
      { id: 16, name: 'Threadery (Sewing Thread, Embroidery Thread...)' },
      {
        id: 10,
        name: 'Milling',
        subcategories: [
          { id: 11, name: 'Assembly' },
          { id: 14, name: 'Winding (Bobinage)' },
          { id: 13, name: 'Twist Splicing (Guipage)' },
          { id: 12, name: 'Re-twisting (Retordage)' },
        ],
      },
      { id: 15, name: 'Texturing' },
    ],
  },
  {
    id: 17,
    name: 'Weaving',
    subcategories: [
      { id: 19, name: 'Armored' },
      { id: 21, name: 'Terry' },
      { id: 22, name: 'Narrow' },
      { id: 20, name: 'Jacquard' },
      { id: 18, name: 'Warping (Ourdissage)' },
    ],
  },
  {
    id: 23,
    name: 'Knitting',
    subcategories: [
      {
        id: 24,
        name: 'Circular',
        subcategories: [
          { id: 26, name: 'Large Diameter' },
          { id: 25, name: 'Small Diameter' },
        ],
      },
      { id: 31, name: 'Non-warp / Chain & Rachel' },
      {
        id: 27,
        name: 'Straight (Rectiligne)',
        subcategories: [
          { id: 29, name: 'Reduced (Fully-Fashion)' },
          { id: 30, name: 'Integral (Seamless)' },
          { id: 28, name: 'Panels (Straight)' },
        ],
      },
    ],
  },
  {
    id: 32,
    name: 'Braiding',
    subcategories: [
      { id: 34, name: 'Cordage (Lace, Rope, Cordage, Strand...)' },
      { id: 33, name: 'Trimming (Passementerie)' },
    ],
  },
  {
    id: 35,
    name: 'Non-woven Fabrics',
    subcategories: [
      { id: 38, name: 'Melt-blown (Voile fondue)' },
      { id: 37, name: 'Wet-laid (Voile humide)' },
      { id: 36, name: 'Dry-laid (Voile sèche)' },
    ],
  },
  {
    id: 39,
    name: 'Lace Making',
    subcategories: [
      { id: 42, name: 'Handmade Lace (Dentelle main)' },
      { id: 41, name: 'Jacquardtronic / Textronic' },
      { id: 40, name: 'Leavers' },
    ],
  },
  {
    id: 43,
    name: 'Embroidery',
    subcategories: [
      { id: 46, name: 'Hand Embroidery (Broderie main)' },
      { id: 45, name: 'Multi-head Machine (Métier multi-têtes)' },
      { id: 44, name: 'Schiffli Machine (Métier Schiffli)' },
      { id: 47, name: 'Padding / Quilting (Ouatinage / Matelassage)' },
    ],
  },
  {
    id: 48,
    name: 'Finishing',
    subcategories: [
      {
        id: 64,
        name: 'Preparation (Apprêt)',
        subcategories: [
          { id: 66, name: 'Chemical (Antibacterial, Flame Retardant...)' },
          { id: 65, name: 'Mechanical (Mécanique)' },
        ],
      },
      { id: 50, name: 'Bleaching (Blanchiment)' },
      { id: 67, name: 'Back-coating (Contre-collage)' },
      { id: 69, name: 'Coating (Enduction)' },
      { id: 51, name: 'Engraving (Cylinder / Frame)' },
      { id: 70, name: 'Textile Engraving / Laser Cutting (Gravure textile / Découpe laser)' },
    ],
  },
  {
    id: 52,
    name: 'Printing',
    subcategories: [
      { id: 53, name: 'Fixed-wash (Fixé-lavé)' },
      { id: 56, name: 'Digital (Numérique)' },
      { id: 54, name: 'Pigmentary (Pigmentaire)' },
      { id: 55, name: 'Transfer (Transfert)' },
      { id: 49, name: 'Laboratory (Tests, Trials...)' },
    ],
  },
  {
    id: 58,
    name: 'Dyeing',
    subcategories: [
      { id: 63, name: 'Finished Articles (Articles Confectionnés)' },
      { id: 59, name: 'Fluff (Bourre)' },
      { id: 61, name: 'Yarns (Écheveaux)' },
      { id: 62, name: 'Fabric / Piece (Étoffe / Pièce)' },
      { id: 60, name: 'Threads (Fils)' },
      { id: 68, name: 'Thermoforming (Thermoformage)' },
    ],
  },
  {
    id: 71,
    name: 'Confection / Assembly',
    subcategories: [
      { id: 72, name: 'Design Office (Bureau d\'études: Modeling, Prototyping, Tuning...)' },
      { id: 73, name: 'Cutting (Coupe)' },
      {
        id: 74,
        name: 'Clothing (Habillement)',
        subcategories: [
          { id: 76, name: 'Warp & Weft (Chaîne & Trame)' },
          { id: 75, name: 'Knitting (Maille)' },
        ],
      },
      { id: 77, name: 'Home Textiles (Textile de Maison)' },
      { id: 78, name: 'Technical Textiles (Textiles Techniques)' },
    ],
  },
  {
    id: 79,
    name: 'Integrated Distribution',
    subcategories: [
      { id: 82, name: 'E-commerce' },
      { id: 81, name: 'Factory Store (Magasin d\'Usine)' },
      { id: 80, name: 'Own Network (Réseau en Propre)' },
    ],
  },
  {
    id: 83,
    name: 'Converting',
    subcategories: [
      { id: 84, name: 'Fabrics (Chaîne & Trame)' },
      { id: 85, name: 'Knits (Maille)' },
    ],
  },
  {
    id: 86,
    name: 'Trading',
    subcategories: [
      { id: 89, name: 'Fabrics (Étoffes)' },
      { id: 87, name: 'Fibers (Fibres)' },
      { id: 88, name: 'Threads (Fils)' },
      {
        id: 90,
        name: 'Finished Products (Produits Finis)',
        subcategories: [
          { id: 91, name: 'Clothing (Habillement)' },
          { id: 92, name: 'Home Textiles (Textiles de Maison)' },
          { id: 93, name: 'Technical Textiles (Textiles Techniques)' },
        ],
      },
    ],
  },
  { id: 95, name: 'Other' },
];

// Define the form's data structure
interface FormData {
  markets: number[];
  materials: number[];
  activities: number[];
}

const TextileBusinessForm: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      markets: [],
      materials: [],
      activities: [],
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Selected Categories:', data);
    // Handle form submission, e.g., send data to an API
  };

  // Recursive component to render categories and subcategories
  const RenderCategory = ({
    category,
    selectedIds,
    toggleSelect,
    level = 0,
  }: {
    category: Category;
    selectedIds: number[];
    toggleSelect: (id: number) => void;
    level?: number;
  }) => {
    const isChecked = selectedIds.includes(category.id);
    const hasSubcategories = category.subcategories && category.subcategories.length > 0;

    return (
      <div key={category.id} className={`ml-${level * 4} mb-2`}>
        <div className="flex items-center">
          <Checkbox
            id={`category-${category.id}`}
            checked={isChecked}
            onCheckedChange={() => toggleSelect(category.id)}
          />
          <label htmlFor={`category-${category.id}`} className="ml-2">
            {category.name}
          </label>
        </div>
        {hasSubcategories && (
          <div className="ml-4 mt-1">
            {category.subcategories!.map((sub) => (
              <RenderCategory
                key={sub.id}
                category={sub}
                selectedIds={selectedIds}
                toggleSelect={toggleSelect}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Handler to toggle selection
  const handleToggleSelect = (
    selectedIds: number[],
    setSelectedIds: (ids: number[]) => void,
    id: number
  ) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Textile Business Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Markets Section */}
        <Accordion type="multiple" className="mb-6">
          <AccordionItem value="markets">
            <AccordionTrigger className="text-xl font-semibold">
              Markets
            </AccordionTrigger>
            <AccordionContent>
              <Controller
                name="markets"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div>
                    {markets.map((market) => (
                      <div key={market.id} className="mb-2">
                        <div className="flex items-center">
                          <Checkbox
                            id={`markets-${market.id}`}
                            checked={value.includes(market.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                onChange([...value, market.id]);
                              } else {
                                onChange(value.filter((id) => id !== market.id));
                              }
                            }}
                          />
                          <label htmlFor={`markets-${market.id}`} className="ml-2">
                            {market.name}
                          </label>
                        </div>
                        {market.subcategories && (
                          <div className="ml-4 mt-1">
                            {market.subcategories.map((sub) => (
                              <div key={sub.id} className="mb-2 flex items-center">
                                <Checkbox
                                  id={`markets-${market.id}-${sub.id}`}
                                  checked={value.includes(sub.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      onChange([...value, sub.id]);
                                    } else {
                                      onChange(value.filter((id) => id !== sub.id));
                                    }
                                  }}
                                />
                                <label htmlFor={`markets-${market.id}-${sub.id}`} className="ml-2">
                                  {sub.name}
                                </label>
                                {/* Render deeper subcategories if any */}
                                {sub.subcategories && (
                                  <div className="ml-4 mt-1">
                                    {sub.subcategories.map((deepSub) => (
                                      <div key={deepSub.id} className="mb-2 flex items-center">
                                        <Checkbox
                                          id={`markets-${market.id}-${sub.id}-${deepSub.id}`}
                                          checked={value.includes(deepSub.id)}
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              onChange([...value, deepSub.id]);
                                            } else {
                                              onChange(value.filter((id) => id !== deepSub.id));
                                            }
                                          }}
                                        />
                                        <label
                                          htmlFor={`markets-${market.id}-${sub.id}-${deepSub.id}`}
                                          className="ml-2"
                                        >
                                          {deepSub.name}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Materials Section */}
        <Accordion type="multiple" className="mb-6">
          <AccordionItem value="materials">
            <AccordionTrigger className="text-xl font-semibold">
              Materials
            </AccordionTrigger>
            <AccordionContent>
              <Controller
                name="materials"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div>
                    {materials.map((material) => (
                      <div key={material.id} className="mb-2">
                        <div className="flex items-center">
                          <Checkbox
                            id={`materials-${material.id}`}
                            checked={value.includes(material.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                onChange([...value, material.id]);
                              } else {
                                onChange(value.filter((id) => id !== material.id));
                              }
                            }}
                          />
                          <label htmlFor={`materials-${material.id}`} className="ml-2">
                            {material.name}
                          </label>
                        </div>
                        {material.subcategories && (
                          <div className="ml-4 mt-1">
                            {material.subcategories.map((sub) => (
                              <div key={sub.id} className="mb-2 flex items-center">
                                <Checkbox
                                  id={`materials-${material.id}-${sub.id}`}
                                  checked={value.includes(sub.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      onChange([...value, sub.id]);
                                    } else {
                                      onChange(value.filter((id) => id !== sub.id));
                                    }
                                  }}
                                />
                                <label htmlFor={`materials-${material.id}-${sub.id}`} className="ml-2">
                                  {sub.name}
                                </label>
                                {/* Render deeper subcategories if any */}
                                {sub.subcategories && (
                                  <div className="ml-4 mt-1">
                                    {sub.subcategories.map((deepSub) => (
                                      <div key={deepSub.id} className="mb-2 flex items-center">
                                        <Checkbox
                                          id={`materials-${material.id}-${sub.id}-${deepSub.id}`}
                                          checked={value.includes(deepSub.id)}
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              onChange([...value, deepSub.id]);
                                            } else {
                                              onChange(value.filter((id) => id !== deepSub.id));
                                            }
                                          }}
                                        />
                                        <label
                                          htmlFor={`materials-${material.id}-${sub.id}-${deepSub.id}`}
                                          className="ml-2"
                                        >
                                          {deepSub.name}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Activities Section */}
        <Accordion type="multiple" className="mb-6">
          <AccordionItem value="activities">
            <AccordionTrigger className="text-xl font-semibold">
              Activities
            </AccordionTrigger>
            <AccordionContent>
              <Controller
                name="activities"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div>
                    {activities.map((activity) => (
                      <div key={activity.id} className="mb-2">
                        <div className="flex items-center">
                          <Checkbox
                            id={`activities-${activity.id}`}
                            checked={value.includes(activity.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                onChange([...value, activity.id]);
                              } else {
                                onChange(value.filter((id) => id !== activity.id));
                              }
                            }}
                          />
                          <label htmlFor={`activities-${activity.id}`} className="ml-2">
                            {activity.name}
                          </label>
                        </div>
                        {activity.subcategories && (
                          <div className="ml-4 mt-1">
                            {activity.subcategories.map((sub) => (
                              <div key={sub.id} className="mb-2 flex items-center">
                                <Checkbox
                                  id={`activities-${activity.id}-${sub.id}`}
                                  checked={value.includes(sub.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      onChange([...value, sub.id]);
                                    } else {
                                      onChange(value.filter((id) => id !== sub.id));
                                    }
                                  }}
                                />
                                <label htmlFor={`activities-${activity.id}-${sub.id}`} className="ml-2">
                                  {sub.name}
                                </label>
                                {/* Render deeper subcategories if any */}
                                {sub.subcategories && (
                                  <div className="ml-4 mt-1">
                                    {sub.subcategories.map((deepSub) => (
                                      <div key={deepSub.id} className="mb-2 flex items-center">
                                        <Checkbox
                                          id={`activities-${activity.id}-${sub.id}-${deepSub.id}`}
                                          checked={value.includes(deepSub.id)}
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              onChange([...value, deepSub.id]);
                                            } else {
                                              onChange(value.filter((id) => id !== deepSub.id));
                                            }
                                          }}
                                        />
                                        <label
                                          htmlFor={`activities-${activity.id}-${sub.id}-${deepSub.id}`}
                                          className="ml-2"
                                        >
                                          {deepSub.name}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default TextileBusinessForm;
