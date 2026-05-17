import vegan from './vegan.png';
import vegetarian from './vegetarian.png';
import glutenFree from './gluten-free.png';
import halal from './halal.png';
import dairyFree from './dairy-free.png';
import catering from './catering.png';
import celebrate from './celebrate.png';
import locationPin from './location-pin.png';
import star from './star.png';
import heart from './heart.png';
import community from './community.png';
import newIcon from './new.png';
import healthy from './healthy.png';
import pizza from './pizza.png';
import burger from './burger.png';
import asian from './asian.png';
import mexican from './mexican.png';
import mediterranean from './mediterranean.png';
import sandwiches from './sandwiches.png';
import brunch from './brunch.png';
import cafeBakery from './cafe-bakery.png';
import seafood from './seafood.png';
import takeout from './takeout.png';
import delivery from './delivery.png';
import lateNight from './late-night.png';
import familyStyle from './family-style.png';
import neighbors from './neighbors.png';
import directory from './directory.png';
import noAds from './no.png';
import foodTruck from './food-truck.png';
import buildings from './buildings.png';

export {
  vegan, vegetarian, glutenFree, halal, dairyFree,
  catering, celebrate, locationPin, star, heart,
  community, newIcon, healthy,
  pizza, burger, asian, mexican, mediterranean, sandwiches, brunch, cafeBakery, seafood,
  takeout, delivery, lateNight, familyStyle,
  neighbors, directory, noAds, foodTruck, buildings,
};

export const DIETARY_ICONS: Record<string, string> = {
  vegan,
  vegetarian,
  'gluten-free': glutenFree,
  halal,
  'dairy-free': dairyFree,
};

export const CUISINE_ICONS: Record<string, string> = {
  Pizza: pizza,
  Burgers: burger,
  Asian: asian,
  Mexican: mexican,
  Mediterranean: mediterranean,
  Sandwiches: sandwiches,
  Brunch: brunch,
  'Café/Bakery': cafeBakery,
  Seafood: seafood,
  Vegetarian: vegetarian,
};

export const SERVICE_ICONS: Record<string, string> = {
  Takeout: takeout,
  Delivery: delivery,
  'Late Night': lateNight,
};

export const CATERING_ICONS: Record<string, string> = {
  'Catering Available': catering,
  'Family-Style': familyStyle,
};
