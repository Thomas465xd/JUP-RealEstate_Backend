import type { Request, Response } from "express";
import Property from "../models/Property";


//! Advanced Search Controller

type searchFilters = {
    status?: string,
    type?: string,
    operation?: string,
    region?: string,
    cityArea?: string,
    condo?: boolean,
    dorms?: number,
    bathrooms?: number,
    parkingSpaces?: number, 
    price?: { $gte?: number, $lte?: number}
}

export class SearchController {
    //^ Advanced Search method with filters & sorting ✅
    static advancedSearch = async (req: Request, res: Response) => {
        try {
            /**
             * ! Advanced search endpoint can accept the following FILTER params
             * @param ?page=(Number of the Current page)
             * @param ?perPage=(How many properties should be displayed per page)
             * 
             * @param ?status=("available", "sold" or "pending")
             * @param ?type=("house", "apartment", "land", "commercial" or "office")
             * 
             * @param ?region=(every chilean region as stated in the property model)
             * @param &cityArea=(every city zone of the selected region)
             * 
             * @param ?minPrice=(A starting range for the property price in UF)
             * @param ?maxPrice=(The End range for the property price in UF)
             * 
             * @param ?condo=(either true or false)
             * 
             * @param ?dorms=(the number of dorms of the desired property)
             * @param ?bathrooms=(the number of bathrooms that the property should have)
             * @param ?parkingSpaces=(the number of parking lots that the property should have)
             * 
             * ! Advanced Search endpoint can accept the following SORT params
             * 
             * @param ?sortOrder=(either "asc" or "desc")
             * @param ?sortBy=("price")
             * 
             * ?If no params are entered, then just return all the properties paginated
             */

            // Get the page and perPage query parameters (default values if not provided)
            const page = Math.max(parseInt(req.query.page as string) || 1, 1);
            const perPage = parseInt(req.query.perPage as string) || 10

            // Calculate skip and limit for pagination
            const skip = (page - 1) * perPage;
            const limit = perPage;

            // Identify filters
            const { status, type, operation, region, cityArea, minPrice, maxPrice, condo, dorms, bathrooms, parkingSpaces } = req.query

            // Build the filters object based on the provided query parameters
            const filters : searchFilters = {};

            //* $gte = greater than or equal to & $lte = less than or equal to
            if(status) filters.status = status as string
            if(type) filters.type = (type as string)
            if(operation) filters.operation = operation as string
            if(region) filters.region = region as string
            if(cityArea) filters.cityArea = cityArea as string
            if(condo) filters.condo = condo === "true" ? true : false
            if(dorms) filters.dorms = parseInt(dorms as string)
            if(bathrooms) filters.bathrooms = parseInt(bathrooms as string)
            if(parkingSpaces) filters.parkingSpaces = parseInt(parkingSpaces as string)

            //~ Price filter handling
            if(minPrice && maxPrice) {
                filters.price = { $gte: Number(minPrice), $lte: Number(maxPrice) }
            } else if (minPrice) {
                filters.price = { $gte: Number(minPrice) }
            } else if (maxPrice) {
                filters.price = { $lte: Number(maxPrice) }
            }

            //console.log(filters)

            // Get the total number of properties that match the filters 
            const totalFilteredProperties = await Property.countDocuments(filters)

            //^ Sorting Logic
            const sortBy = req.query.sortBy as string 
            const sortOrder = req.query.sortOrder === "asc" ? 1 : -1; 

            let sort : Record<string, 1 | -1> = { createdAt: -1} // default sorting criteria

            //? With the if approach more sorting criteria could be added in the future in an easy way
            if(sortBy === "price") {
                sort = { price: sortOrder }
            }

            //...

            // Get properties that match the search criteria
            const properties = await Property.find(filters)
                .skip(skip)
                .limit(limit)
                .sort(sort)

            // Calculate the total number of pages
            const totalPages = Math.ceil(totalFilteredProperties / perPage)

            // Return a successful server response
            res.status(200).json({ 
                totalFilteredProperties, 
                totalPages, 
                currentPage: page, 
                perPage, 
                properties 
            })

        } catch (error) {
            res.status(500).json({ message: "Internal Server Error when performing Search" })
            console.log(error)
        }
    }
}