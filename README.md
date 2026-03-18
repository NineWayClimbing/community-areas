# Community Areas

9Way Climbing public community areas — a collection of bouldering locations in Portugal.

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
| `boulderCount` | number | Total number of boulder problems   |

### `data.json`

Each area's `data.json` contains the full details:

| Field           | Type   | Description                              |
| --------------- | ------ | ---------------------------------------- |
| `name`          | string | Area name                                |
| `type`          | string | Activity type                            |
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

## Contributing

### Adding a new area

1. Create a new directory using a URL-safe slug (lowercase, hyphens): `my-new-area/`
2. Add a `data.json` following the schema above.
3. Add images to `my-new-area/images/`.
4. Add an entry to `index.json` with the matching `slug`, `name`, `country`, `city`, `type`, and `boulderCount`.

### Updating an existing area

1. Edit the area's `data.json` with your changes.
2. If the boulder count changed, update `boulderCount` in `index.json`.
3. If area metadata (name, city, etc.) changed, update the corresponding entry in `index.json`.

### Important

Every PR is validated by CI — your changes to area directories **must** be reflected in `index.json`. The check will fail if:

- An area directory exists but has no entry in `index.json`.
- The `boulderCount` in `index.json` doesn't match the actual number of boulders in `data.json`.
- The `slug`, `name`, `country`, `city`, or `type` fields are out of sync.
- Any image file exceeds the **100KB** size limit.
- Any image is not in **JPG** format (only `.jpg`/`.jpeg` files are allowed).
