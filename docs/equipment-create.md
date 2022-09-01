# Create Equipment

Create and persist a new **Equipment**.

## Usecase

1. Receive a **POST** request on route **(POST) [url]/equipment**
   - Example: <http://localhost:3003/equipment>
1. **Validate** the requested data based on the dto
1. **Business Rules**:
   - There should only be a unique equipment with a given **Model** and **Category**
1. Create the new **Equipment**
1. Return **Ok** with the created **Equipment** data:
   - **ID**
   - **Model**
   - **Category**
   - **PPM**
   - **Wifi**
   - **Consumption**

[<<BACK](../README.md)
