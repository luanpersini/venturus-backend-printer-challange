# Update equipment

Updating a existing **equipment**.

## Usecase

1. 1. Receive a **PATCH** request on route **[url]/equipment?id={id}**.
   - Example: [PATCH]`http://localhost:3003/equipment?id=123`
1. **Validate** the requested data based on the dto:
   - **id** should be a valid UUID
1. **Business Rules**:
   - Check if the request data is not an empty object {}
   - Check if an equipment with the given **id** exists
   - There should only be a unique equipment with a given **Model** and **Category**
1. Return **Ok** with the updated **Equipment** data:
   - **ID**
   - **Model**
   - **Category**
   - **PPM**
   - **Wifi**
   - **Consumption**

[<<BACK](../README.md)
