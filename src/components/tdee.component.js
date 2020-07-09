import React, { Component } from "react";

export default class TDEE extends Component {
  constructor(props) {
    super(props);

    this.onChangeSex = this.onChangeSex.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeActivity = this.onChangeActivity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      result: 0,
      sex: "",
      age: 0,
      weight: 0,
      height: 0,
      activity: 1.2,
    };
  }

  onChangeSex(e) {
    this.setState({
      sex: e.target.value,
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value,
    });
  }

  onChangeHeight(e) {
    this.setState({
      height: e.target.value,
    });
  }

  onChangeWeight(e) {
    this.setState({
      weight: e.target.value,
    });
  }

  onChangeActivity(e) {
    this.setState({
      activity: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const inputData = {
      sex: this.state.sex,
      age: this.state.age,
      height: this.state.height,
      weight: this.state.weight,
      activity: this.state.activity,
    };

    let s;
    if (inputData.sex === 'male') {
      s = 5;
    } else {
      s = -151;
    }

    const bmr = (10 * inputData.weight + 6.25 * inputData.height - 5 * inputData.age) + s;
    const tdee = bmr * inputData.activity;

    console.log(inputData);
    console.log(bmr);
    console.log(tdee);

    this.setState({
      result: tdee
    })
  }

  render() {
    return (
      <section className="text-gray-700 body-font relative">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col w-full mb-12">
            <h1 className="sm:text-3xl text-2xl text-center font-medium title-font mb-4 text-gray-900">
              TDEE Calculator
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Reiciendis, adipisci doloremque itaque unde placeat dolor illo
              laudantium assumenda quae sequi eum cupiditate repudiandae
              officiis optio enim totam nulla sunt voluptate inventore illum
              aliquid dignissimos minus. Officia a quis iste quae.
            </p>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates ea nemo exercitationem iure doloremque, vitae
              voluptatem eveniet fugiat, aliquid quas repellendus voluptate,
              quaerat laborum accusamus.
            </p>
          </div>
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Calculate Your TDEE
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <form onSubmit={this.onSubmit}>
                <div className="p-2 w-full text-center">
                  <span className="text-gray-700 font-semibold text-lg">
                    Sex
                  </span>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <span className="mr-2">Male</span>
                      <input
                        type="radio"
                        className="form-radio border-gray-400 text-green-500"
                        name="sex"
                        value="male"
                        checked={this.state.sex === "male"}
                        onChange={this.onChangeSex}
                      />
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <span className="mr-2">Female</span>
                      <input
                        type="radio"
                        className="form-radio border-gray-400 text-green-500"
                        name="sex"
                        value="female"
                        checked={this.state.sex === "female"}
                        onChange={this.onChangeSex}
                      />
                    </label>
                  </div>
                </div>
                <div className="p-2 w-full text-center">
                  <span className="text-gray-700 font-semibold text-lg">
                    Age
                  </span>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="form-input text-center w-1/6"
                      name="age"
                      value={this.state.age}
                      onChange={this.onChangeAge}
                    />
                  </div>
                </div>
                <div className="p-2 w-full text-center">
                  <span className="text-gray-700 font-semibold text-lg">
                    Weight (kg)
                  </span>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="form-input text-center w-1/6"
                      name="weight"
                      value={this.state.weight}
                      onChange={this.onChangeWeight}
                    />
                  </div>
                </div>
                <div className="p-2 w-full text-center">
                  <span className="text-gray-700 font-semibold text-lg">
                    Height (cm)
                  </span>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="form-input text-center w-1/6"
                      name="height"
                      value={this.state.height}
                      onChange={this.onChangeHeight}
                    />
                  </div>
                </div>
                <div className="p-2 w-full text-center">
                  <span className="text-gray-700 font-semibold text-lg">
                    Activity Level
                  </span>
                  <div className="mt-2">
                    <select
                      className="form-select block w-1/2 self-center mt-1 mx-auto"
                      name="activity"
                      value={this.state.activity}
                      onChange={this.onChangeActivity}
                    >
                      <option value="1.2">
                        Sedentary (little to no exercise + work a desk job)
                      </option>
                      <option value="1.375">
                        Lightly Active (light exercise 1-3 days / week)
                      </option>
                      <option value="1.55">
                        Moderately Active (moderate exercise 3-5 days / week)
                      </option>
                      <option value="1.725">
                        Very Active (heavy exercise 6-7 days / week)
                      </option>
                      <option value="1.9">
                        Extremely Active (very heavy exercise, hard labor job,
                        training 2x / day)
                      </option>
                    </select>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                    Calculate
                  </button>
                </div>
              </form>
            </div>
            <div className="flex flex-wrap -m-2 text-center">
              <div className="mx-5">TDEE : {this.state.result}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
