# Patient Information Component Values

This values are used to send data through the reusable component. As mentioned above, it is reusable and only varies depending on the `.json` file received.

```javascript
patientInformation() {
      return {
        header: {
          title: "Patient Information",
          icon: "mdi-folder-multiple",
        },
        image_url: this.$url + this.registrant.citizen.citizen_file.image_url,
        info: [
          {
            title: "Patient Name",
            content: `value`,
          },
          {
            title: "Age",
            content: `value`,
          },
          {
            title: "Sex",
            content: `value`,
          },
          {
            title: "Date Of Birth",
            content: format(
              parseISO(`value`),
              "MMMM dd, yyyy"
            ),
          },
          {
            title: "Municipality",
            content: `value`,
          },
          {
            title: "Barangay",
            content: `value`,
          },
          {
            title: "Address",
            content: `value`,
          },
        ],
        additional_info: [
          {
            title: "Civil Status",
            content: `value`,
          },
          {
            title: "Religion",
            content: `value`,
          },
          {
            title: "Occupation",
            content: `value`
              ? `value`
              : "None Specified",
          },
          {
            title: "Nationality",
            content: `value`,
          },
        ],
      };
    },
```
