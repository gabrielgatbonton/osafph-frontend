# Patient Service Component Values

This values are used to send data through the reusable component. As mentioned above, it is reusable and only varies depending on the `.json` file received.

```javascript
serviceInformation() {
      return {
        header: {
          title: "Hospital Service Information",
          icon: "mdi-medical-bag",
        },
        info: [
          {
            title: "Service ID",
            content: `value`,
          },
          {
            title: "Health Professional",
            content: `value`,
          },
          {
            title: "Service Availed",
            content: `value`,
          },
          {
            title: "Serviceable Availed",
            content: `value`,
          },
        ],
        remarks: [
          {
            title: "Remarks",
            content: `value`
              ? `value`
              : "None",
          },
        ],
        items_availed: {
            //Value in service type is used to determine whether the component adjusts or not. See Component...
          service_type: `value`,
          //Items are for created dialysis sessions
          items: `value`,
        },
      };
    },
```
