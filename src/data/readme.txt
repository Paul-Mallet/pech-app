General data about fishes & regulations(Update's coming)

! /services will be use as APIs call !

FISHES schema
- commonName: string
- scientificName: string
- category: string[]
- localNames?: string
- minSizeCm: number
- englishAcronym: string
- physicalDescription
	- WRF(): string
	- moreInfos?: string
- fishingMethods: string[]
- regulation
	- reference: string
	- annex: string

REGULATIONS schema
- id: number
- date: string
- title: string
- content: string[]
- metadata: { reference: string, lastUpdated: string }
	- reference: string
	- lastUpdated: string

Legend in Typescript:
: string = primitive type
? = optional