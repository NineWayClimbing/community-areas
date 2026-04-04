# Community Areas

9Way Climbing public community areas — a collection of community maintained climbing locations.

## Structure

Each area lives in its own directory named by slug:

```
<slug>/
├── data.json
└── images/
    └── <image-files>
```

### `index.json`

The root `index.json` is a registry of all areas. Each entry has:

| Field          | Type   | Description                        |
| -------------- | ------ | ---------------------------------- |
| `slug`         | string | Directory name / URL-safe ID       |
| `name`         | string | Display name of the area           |
| `country`      | string | Country (e.g. `"Portugal"`)        |
| `city`         | string | City name                          |
| `type`         | string | Activity type (e.g. `"Bouldering"`)  |
| `status`       | string | Area status: `"DRAFT"` or `"READY"` |
| `boulderCount` | number | Total number of boulder problems   |
| `version`      | number | Version number (positive integer, bumped on each change) |

### `data.json`

Each area's `data.json` contains the full details:

| Field           | Type   | Description                              |
| --------------- | ------ | ---------------------------------------- |
| `name`          | string | Area name                                |
| `type`          | string | Activity type                            |
| `status`        | string | Area status: `"DRAFT"` or `"READY"`      |
| `coordinates`   | object | `{ latitude, longitude }`                |
| `country`       | string | Country                                  |
| `city`          | string | City                                     |
| `description`   | string | Directions / area description            |
| `imageFilename` | string | Main image filename (in `images/`)       |
| `boulders`      | array  | List of boulder problems                 |

Each boulder object:

| Field           | Type   | Required | Description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `name`          | string | yes      | Route name                     |
| `grade`         | string | yes      | Climbing grade (e.g. `"6a+"`) |
| `notes`         | string | yes      | Beta / notes (can be empty)    |
| `sector`        | string | no       | Sub-area within the location   |
| `imageFilename` | string | no       | Route-specific image filename  |

## Area Editor

The repository includes a browser-based area browser and editor, available at **https://ninewayclimbing.github.io/community-areas/**.

### Browsing areas

The home page lists all community areas from `index.json` as cards showing the area name, location, type, and boulder count. Use the search bar to filter areas by name, country, or city. Summary statistics (total areas, boulders, and countries) are displayed at the top.

### Editing an existing area

Click any area card to open it in the editor. The full `data.json` and boulder images are loaded automatically. From there you can:

- Edit area metadata (name, type, coordinates, country, city, description).
- Edit, add, or remove boulder problems.
- Upload and compress images (automatically resized to 1200px width, stepped quality reduction to stay under 300KB).
- Draw route lines on boulder images.
- Preview and export the resulting `data.json` or download a ZIP with all data and images.

Use the back arrow in the top bar to return to the area list.

### Creating a new area

Click the **+** button on the home page to open a blank editor. Fill in the area details, add boulders, and export when ready.

## Contributing

### Adding a new area

1. Create a new directory using a URL-safe slug (lowercase, hyphens): `my-new-area/`
2. Add a `data.json` following the schema above.
3. Add images to `my-new-area/images/`.
4. Add an entry to `index.json` with the matching `slug`, `name`, `country`, `city`, `type`, `status` (set to `"DRAFT"` or `"READY"`), `boulderCount`, and `version` set to `1`.

### Updating an existing area

1. Edit the area's `data.json` with your changes.
2. If the boulder count changed, update `boulderCount` in `index.json`.
3. If area metadata (name, city, etc.) changed, update the corresponding entry in `index.json`.
4. Bump the `version` field in `index.json` by 1 for each changed area.

### Important

Every PR is validated by CI — your changes to area directories **must** be reflected in `index.json`. The check will fail if:

- An area directory exists but has no entry in `index.json`.
- The `boulderCount` in `index.json` doesn't match the actual number of boulders in `data.json`.
- The `slug`, `name`, `country`, `city`, `type`, or `status` fields are out of sync.
- The `status` field is not `"DRAFT"` or `"READY"`.
- The `version` field is missing, not a positive integer, or was not bumped by 1 for changed areas.
- Any image file exceeds the **300KB** size limit.
- Any image is not in **JPG** format (only `.jpg`/`.jpeg` files are allowed).
