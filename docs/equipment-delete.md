# Create equipment

Delete a existing **equipment** from the app.

## Usecase

1. Receive a **DELETE** request on route **[url]/equipment?id={id}**.
   - Example: [DELETE]`http://localhost:3003/equipment?id=123`
1. **Validate** the requested data based on the dto:
   - **id** should be a valid UUID
1. **Business Rules**:
   - Check if an equipment with the given **id** exists
1. The existing equipment will be hard deleted

[<<BACK](../README.md)
