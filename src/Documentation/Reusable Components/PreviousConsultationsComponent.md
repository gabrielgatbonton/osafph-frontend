# Previous Consultations Component Values

This values are used to send data through the reusable component. As mentioned above, it is reusable and only varies depending on the `.json` file received.

```javascript
    previousConsultations() {
      if (
        !this.previous_consultations ||
        !Array.isArray(this.previous_consultations)
      ) {
        return [];
      }
      return this.previous_consultations.map((item) => ({
        consultation_date: format(
          parseISO(item.consultation_date),
          "MMMM dd, yyyy"
        ),
        subjectives: [
          {
            title: "Chief Complaint",
            content: item.chief_complaint
              ? item.chief_complaint
              : "None Specified",
          },
          {
            title: "History Of Present Illness",
            content: Array.isArray(item.history_of_present_illness)
              ? item.history_of_present_illness.join(", ")
              : item.history_of_present_illness,
          },
          {
            title: "Past Medical History",
            content: Array.isArray(item.past_medical_history)
              ? item.past_medical_history.join(", ")
              : item.past_medical_history,
          },
          {
            title: "Family Medical History",
            content: Array.isArray(item.family_medical_history)
              ? item.family_medical_history.join(", ")
              : item.family_medical_history,
          },
        ],
        objectives: [
          {
            title: "Blood Pressure",
            content: item.blood_pressure,
          },
          {
            title: "Heart Rate",
            content: item.heart_rate,
          },
          {
            title: "Respiratory Rate",
            content: item.respiratory_rate,
          },
          {
            title: "Temperature",
            content: item.temperature,
          },
          {
            title: "Oxygen Saturation",
            content: item.oxygen_saturation,
          },
          {
            title: "Weight",
            content: item.weight,
          },
          {
            title: "height",
            content: item.height,
          },
          {
            title: "Body Mass Index",
            content: item.body_mass_index,
          },
          {
            title: "Pertinent Findings",
            content: item.pertinent_findings,
          },
        ],
        assessments: [
          {
            title: "Diagnosis",
            content: item.diagnosis,
          },
        ],
        plans: [
          {
            title: "Diagnostics",
            content: Array.isArray(item.diagnostic_type)
              ? item.diagnostic_type.join(", ")
              : item.diagnostic_type,
          },
          {
            title: "Medications",
            content: item.medications,
          },
          {
            title: "Referrals",
            content: item.referral,
          },
          {
            title: "Others",
            content: item.others ? item.others : "None Specified",
          },
          {
            title: "",
            content: "",
          },
          {
            title: "Follow Up Date",
            content: format(parseISO(item.follow_up_date), "MMMM dd, yyyy"),
          },
          {
            title: "Fit To Work Starting",
            content: format(
              parseISO(item.fit_to_work_starting),
              "MMMM dd, yyyy"
            ),
          },
          {
            title: "May Rest For",
            content: item.may_rest_for,
          },
        ],
      }));
    },
```
