// Elements to Perform Operations
const elm_seatLeftCount = document.getElementById("seatLeftCount");
const elm_selectedSeatCount = document.getElementById("selectedSeatCount");
const elm_selectedSeatContainer = document.getElementById(
  "selectedSeatContainer"
);
const elm_totalPrice = document.getElementById("totalPrice");
const elm_discountContainer = document.getElementById("discountContainer");
const elm_discountPrice = document.getElementById("discountPrice");
const elm_grandPrice = document.getElementById("grandPrice");
const elm_passengerName = document.getElementById("passengerName");
const elm_passengerNumber = document.getElementById("passengerNumber");
const elm_passengerEmail = document.getElementById("passengerEmail");
const elm_buyTicketForm = document.getElementById("buyTicketForm");
const elm_couponForm = document.getElementById("couponForm");
const elm_couponInput = document.getElementById("couponInput");
const elm_submitPurchase = document.getElementById("submitPurchase");
const elm_couponButton = document.getElementById("couponButton");

const elm_seatSelectNotice = document.getElementById("seatSelectNotice");
const elm_couponNotice = document.getElementById("couponNotice");

const elm_modal = document.getElementById("my_modal_1");

const elms_seatOptions = document.getElementsByClassName("seat");

// Global Variables
let seatLeftCount = 40;
let selectedSeats = [];
const couponCodes = {
  NEW15: 15,
  "COUPLE 20": 20,
};
const seatPrice = 550;

// Elements to Add
const selectedSeatHTML = ` <div class="flex justify-between">
<p class="text-[#03071299]">SelectedSeatNo</p>
<p class="text-[#03071299]">Economy</p>
<p class="text-[#03071299]">550</p>
</div>`;

// When Item is Selected
const seatSelectHandler = (e) => {
  if (selectedSeats.length === 4) {
    elm_seatSelectNotice.innerText = "MAX is 4 Seats";
    elm_seatSelectNotice.classList.remove("hidden");

    return;
  }

  selectedSeats.push(e.target);

  e.target.classList.add("selected-seat");
  e.target.disabled = true;
  elm_selectedSeatContainer.innerHTML += selectedSeatHTML.replace(
    "SelectedSeatNo",
    e.target.innerText
  );

  seatLeftCount--;
  elm_seatLeftCount.innerText = seatLeftCount;
  elm_selectedSeatCount.innerText = selectedSeats.length;

  const totalPrice = seatPrice * selectedSeats.length;
  elm_totalPrice.innerText = totalPrice;

  elm_grandPrice.innerText = totalPrice;

  if (selectedSeats.length === 4) {
    elm_couponButton.disabled = false;
  }

  if (elm_passengerNumber.value.length > 0) {
    elm_submitPurchase.disabled = false;
  }
};

// Reset All Values
const resetValues = () => {
  for (const selectedSeat of selectedSeats) {
    selectedSeat.classList.remove("selected-seat");
    selectedSeat.disabled = false;
  }

  seatLeftCount = 40;
  elm_seatLeftCount.innerText = seatLeftCount;
  elm_selectedSeatCount.innerText = 0;
  elm_buyTicketForm.reset();

  elm_totalPrice.innerText = 0;
  elm_grandPrice.innerText = 0;
  elm_discountPrice.innerText = 0;

  elm_submitPurchase.disabled = true;
  elm_couponButton.disabled = true;
  elm_couponForm.classList.remove("hidden");

  elm_selectedSeatContainer.innerHTML = "";
  selectedSeats = [];
};

// Add Event Listener to Seat Options
for (const elm_seat of elms_seatOptions) {
  elm_seat.addEventListener("click", seatSelectHandler);
}

// Coupon Apply Event
elm_couponForm.addEventListener("submit", (e) => {
  e.preventDefault();
  elm_couponNotice.classList.add("hidden");

  const coupon = elm_couponInput.value;

  const discount = couponCodes[coupon.toUpperCase()];
  if (!discount) {
    elm_couponNotice.innerText = "Wrong Coupon!";
    elm_couponNotice.classList.remove("hidden");

    return;
  }

  const totalPrice = seatPrice * selectedSeats.length;

  const discountPrice = (totalPrice / 100) * discount;
  const grandPrice = totalPrice - discountPrice;

  elm_discountPrice.innerText = discountPrice;
  elm_grandPrice.innerText = grandPrice;

  elm_couponForm.classList.add("hidden");
  elm_couponForm.reset();
});

// Enable Submit Button
elm_passengerNumber.addEventListener("input", (e) => {
  if (e.target.value.length > 0 && selectedSeats.length > 0) {
    elm_submitPurchase.disabled = false;
  } else {
    elm_submitPurchase.disabled = true;
  }
});

elm_buyTicketForm.addEventListener("submit", (e) => {
  e.preventDefault();

  elm_modal.showModal();
  resetValues();
});
