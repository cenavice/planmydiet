import React from "react";

function Nutrition(props) {
  const nutiritions = props.nutiritions;

  if (Object.keys(nutiritions).length === 0) {
    return <h2>loading...</h2>;
  }

  function calculatePercentage(nutritionType, value) {
    if (nutritionType === "fat") {
      return Math.ceil((value / 65) * 100);
    }

    if (nutritionType === "saturated_fat") {
      return Math.ceil((value / 20) * 100);
    }

    if (nutritionType === "cholesterol") {
      return Math.ceil((value / 300) * 100);
    }

    if (nutritionType === "sodium") {
      return Math.ceil((value / 2400) * 100);
    }

    if (nutritionType === "carbohydrate") {
      return Math.ceil((value / 300) * 100);
    }

    if (nutritionType === "fiber") {
      return Math.ceil((value / 25) * 100);
    }

    if (nutritionType === "protein") {
      return Math.ceil((value / 50) * 100);
    }

    if (nutritionType === "vitamin_d") {
      return Math.ceil((value / 20) * 100);
    }

    if (nutritionType === "calcium") {
      return Math.ceil((value / 1300) * 100);
    }

    if (nutritionType === "iron") {
      return Math.ceil((value / 18) * 100);
    }

    if (nutritionType === "potassium") {
      return Math.ceil((value / 4700) * 100);
    }

    if (nutritionType === "vitamin_a") {
      return Math.ceil((value / 900) * 100);
    }

    if (nutritionType === "vitamin_c") {
      return Math.ceil((value / 90) * 100);
    }
  }

  function calculateValue(nutritionType, percentage) {
    if (nutritionType === "vitamin_d") {
      return percentage * 20 / 100;
    }

    if (nutritionType === "calcium") {
      return percentage * 1300 / 100;
    }

    if (nutritionType === "iron") {
      return percentage * 18 / 100;
    }

    if (nutritionType === "potassium") {
      return percentage * 4700 / 100;
    }

    if (nutritionType === "vitamin_a") {
      return percentage * 900 / 100;
    }

    if (nutritionType === "vitamin_c") {
      return percentage * 90 / 100;
    }
  }

  return (
    <div>
      <h3 className="text-xs">Amount Per Serving</h3>
      <h4 className="">
        Calories
        <span className="float-right font-bold">{nutiritions.calories}</span>
      </h4>
      <hr className="mb-1 mt-1" />
      <ul>
        <li className="text-sm text-right font-semibold">% Daily Value*</li>
        <li className="text-sm font-semibold">
          Total Fat <span className="text-green-700">{nutiritions.fat}g</span>
          <span className="float-right font-semibold">
            {calculatePercentage("fat", nutiritions.fat)}%
          </span>
        </li>
        <li className="text-xs ml-3">
          Saturated Fat{" "}
          <span className="text-green-700">{nutiritions.saturated_fat}g</span>
          <span className="float-right font-semibold">
            {calculatePercentage("saturated_fat", nutiritions.saturated_fat)}%
          </span>
        </li>
        <li className="text-xs ml-3">
          Trans Fat{" "}
          <span className="text-green-700">{nutiritions.trans_fat}g</span>
          <span className="float-right font-semibold"></span>
        </li>
        <li className="text-xs ml-3">
          Polyunsaturated Fat{" "}
          <span className="text-green-700">
            {nutiritions.polyunsaturated_fat}g
          </span>
          <span className="float-right font-semibold"></span>
        </li>
        <li className="text-xs ml-3">
          Monounsaturated Fat{" "}
          <span className="text-green-700">
            {nutiritions.monounsaturated_fat}g
          </span>
          <span className="float-right font-semibold"></span>
        </li>
        <li className="text-sm font-semibold">
          Cholesterol{" "}
          <span className="text-green-700">{nutiritions.cholesterol}mg</span>
          <span className="float-right font-semibold">
            {calculatePercentage("cholesterol", nutiritions.cholesterol)}%
          </span>
        </li>
        <li className="text-sm font-semibold">
          Sodium <span className="text-green-700">{nutiritions.sodium}mg</span>
          <span className="float-right font-semibold">
            {calculatePercentage("sodium", nutiritions.sodium)}%
          </span>
        </li>
        <li className="text-sm font-semibold">
          Total Carbohydrate{" "}
          <span className="text-green-700">{nutiritions.carbohydrate}g</span>
          <span className="float-right font-semibold">
            {calculatePercentage("carbohydrate", nutiritions.carbohydrate)}%
          </span>
        </li>
        <li className="text-xs ml-3">
          Dietary Fiber{" "}
          <span className="text-green-700">{nutiritions.fiber}g</span>
          <span className="float-right font-semibold">
            {calculatePercentage("fiber", nutiritions.fiber)}%
          </span>
        </li>
        <li className="text-xs ml-3">
          Sugars <span className="text-green-700">{nutiritions.sugar}g</span>
          <span className="float-right font-semibold"></span>
        </li>
        <li className="text-sm font-semibold">
          Protein <span className="text-green-700">{nutiritions.protein}g</span>
          {/* <span className="float-right font-semibold">6%</span> */}
        </li>
        <hr className="mb-1 mt-1" />
        <li className="text-xs">
          Vitamin D{" "}
          <span className="text-green-700">{nutiritions.vitamin_d ? calculateValue('vitamin_d', nutiritions.vitamin_d) + 'mcg' : "-"}</span>
          <span className="float-right">{nutiritions.vitamin_d && nutiritions.vitamin_d + '%'}</span>
        </li>
        <li className="text-xs">
          Calcium{" "}
          <span className="text-green-700">{calculateValue('calcium', nutiritions.calcium)}mg</span>
          <span className="float-right">{nutiritions.calcium}%</span>
        </li>
        <li className="text-xs">
          Iron <span className="text-green-700">{calculateValue('iron', nutiritions.iron)}mg</span>
          <span className="float-right">{nutiritions.iron}%</span>
        </li>
        <li className="text-xs">
          Potassium{" "}
          <span className="text-green-700">{nutiritions.potassium}mg</span>
          <span className="float-right">{calculatePercentage('potassium', nutiritions.potassium)}%</span>
        </li>
        <li className="text-xs">
          Vitamin A{" "}
          <span className="text-green-700">{calculateValue('vitamin_a', nutiritions.vitamin_a)}mcg</span>
          <span className="float-right">{nutiritions.vitamin_a}%</span>
        </li>
        <li className="text-xs">
          Vitamin C{" "}
          <span className="text-green-700">{calculateValue('vitamin_c', nutiritions.vitamin_c)}mg</span>
          <span className="float-right">{nutiritions.vitamin_c}%</span>
        </li>
      </ul>
      <hr className="mb-1 mt-1" />
      <p className="text-xs">
        * The % Daily Value (DV) tells you how much a nutrient in a serving of
        food contributes to a daily diet. 2,000 calories a day is used for
        general nutrition advice.
      </p>
    </div>
  );
}

export default Nutrition;