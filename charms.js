// charms.js - Use IIFE to prevent global pollution
(function() {
    // Only declare if not already declared
    if (typeof window.specialCharms === 'undefined') {
         window.specialCharms = [
  // 8ball charms
 
  // beach charms
  { src: 'special/beach/beach.png', category: 'beach', quantity: 3 },
  { src: 'special/beach/beach1.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/beach2.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/beach3.png', category: 'beach', quantity: 0 },
  { src: 'special/beach/beach4.png', category: 'beach', quantity: 2 },
  { src: 'special/beach/beach5.png', category: 'beach', quantity: 0 },
  { src: 'special/beach/beach6.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/beach7.png', category: 'beach', quantity: 2 },
  { src: 'special/beach/beach8.png', category: 'beach', quantity: 0 },
  { src: 'special/beach/beach9.png', category: 'beach', quantity: 3 },
  { src: 'special/beach/beach10.png', category: 'beach', quantity: 2 },
  { src: 'special/beach/beach11.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/beach12.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/beach13.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/beach14.png', category: 'beach', quantity: 3 },
  { src: 'special/beach/beach15.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/beach16.png', category: 'beach', quantity: 0 },
  { src: 'special/beach/beach17.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/beach18.png', category: 'beach', quantity: 0 },
  { src: 'special/beach/103-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/104-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/105-gold.png', category: 'beach', quantity: 3 },
  { src: 'special/beach/106-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/107-gold.png', category: 'beach', quantity: 3 },
  { src: 'special/beach/108-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/109-gold.png', category: 'beach', quantity: 0 },
  { src: 'special/beach/110-gold.png', category: 'beach', quantity: 0 },
  { src: 'special/beach/111-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/112-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/113-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/114-gold.png', category: 'beach', quantity: 2 },
  { src: 'special/beach/115-gold.png', category: 'beach', quantity: 3 },
  { src: 'special/beach/91-gold.png', category: 'beach', quantity: 0 },
  { src: 'special/beach/x1.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x10-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x11.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x12-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x13.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x14-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x15.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x16-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x17.png', category: 'beach', quantity: 0 },
  { src: 'special/beach/x18-gold.png', category: 'beach', quantity: 0 },
  { src: 'special/beach/x19.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x2-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x20-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x21.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x22-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x3.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x4-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x5.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x6-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x7.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x8-gold.png', category: 'beach', quantity: 1 },
  { src: 'special/beach/x9.png', category: 'beach', quantity: 1 },
  // bows charms
  { src: 'special/bows/beige.png', category: 'bows', quantity: 19 },
  { src: 'special/bows/62-gold.png', category: 'bows', quantity: 9 },
  { src: 'special/bows/63-gold.png', category: 'bows', quantity: 0 },
  { src: 'special/bows/64-gold.png', category: 'bows', quantity: 20 },
  { src: 'special/bows/65-gold.png', category: 'bows', quantity: 19 },
  { src: 'special/bows/66-gold.png', category: 'bows', quantity: 10 },
  { src: 'special/bows/67-gold.png', category: 'bows', quantity: 16 },
  { src: 'special/bows/68-gold.png', category: 'bows', quantity: 8 },
  { src: 'special/bows/69-gold.png', category: 'bows', quantity: 14 },
  { src: 'special/bows/black.png', category: 'bows', quantity: 20 },
  { src: 'special/bows/dark pink.png', category: 'bows', quantity: 14 },
  { src: 'special/bows/navy.png', category: 'bows', quantity: 10 },
  { src: 'special/bows/pink.png', category: 'bows', quantity: 0 },
  { src: 'special/bows/purple.png', category: 'bows', quantity: 8 },
  { src: 'special/bows/red.png', category: 'bows', quantity: 16 },
  { src: 'special/bows/wwhite.png', category: 'bows', quantity: 9 },
  // simple charms
  { src: 'special/cute and simple/2.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/3.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/4.png', category: 'simple', quantity: 0 },
  { src: 'special/cute and simple/5.png', category: 'simple', quantity: 0 },
  { src: 'special/cute and simple/6.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/7.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/8.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/9.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/10.png', category: 'simple', quantity: 3 },
  { src: 'special/cute and simple/11.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/12.png', category: 'simple', quantity: 5 },
  { src: 'special/cute and simple/13.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/14.png', category: 'simple', quantity: 0 },
  { src: 'special/cute and simple/15.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/16.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/17.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/18.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/20.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/21.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/22.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/23.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/24.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/25.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/26.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/27.png', category: 'simple', quantity: 0 },
  { src: 'special/cute and simple/28.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/29.png', category: 'simple', quantity: 0 },
  { src: 'special/cute and simple/30.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/31.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/32.png', category: 'simple', quantity: 3 },
  { src: 'special/cute and simple/33.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/34.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/35.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/36.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/37.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/c2.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/c3.png', category: 'simple', quantity: 3 },
  { src: 'special/cute and simple/c4.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/c5.png', category: 'simple', quantity: 1 },
  { src: 'special/cute and simple/c6.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/turtle.png', category: 'simple', quantity: 2 },
  { src: 'special/cute and simple/c7.png', category: 'simple', quantity: 5 },
  { src: 'special/cute and simple/c8.png', category: 'simple', quantity: 2 },
  // cutespecials charms
  { src: 'special/cute specials/so cute.png', category: 'cutespecials', quantity: 11 },
  { src: 'special/cute specials/102-gold.png', category: 'cutespecials', quantity: 31 },
  { src: 'special/cute specials/116-gold.png', category: 'cutespecials', quantity: 6 },
  { src: 'special/cute specials/117-gold.png', category: 'cutespecials', quantity: 7 },
  { src: 'special/cute specials/118-gold.png', category: 'cutespecials', quantity: 15 },
  { src: 'special/cute specials/119-gold.png', category: 'cutespecials', quantity: 8 },
  { src: 'special/cute specials/120-gold.png', category: 'cutespecials', quantity: 11 },
  { src: 'special/cute specials/121-gold.png', category: 'cutespecials', quantity: 9 },
  { src: 'special/cute specials/122-gold.png', category: 'cutespecials', quantity: 7 },
  { src: 'special/cute specials/123-gold.png', category: 'cutespecials', quantity: 7 },
  { src: 'special/cute specials/124-gold.png', category: 'cutespecials', quantity: 7 },
  { src: 'special/cute specials/125-gold.png', category: 'cutespecials', quantity: 8 },
  { src: 'special/cute specials/126-gold.png', category: 'cutespecials', quantity: 10 },
  { src: 'special/cute specials/127-gold.png', category: 'cutespecials', quantity: 5 },
  { src: 'special/cute specials/128-gold.png', category: 'cutespecials', quantity: 7 },
  { src: 'special/cute specials/special.png', category: 'cutespecials', quantity: 15 },
  { src: 'special/cute specials/special2.png', category: 'cutespecials', quantity: 46 },
  { src: 'special/cute specials/1-gold.png', category: 'cutespecials', quantity: 46 },
  { src: 'special/cute specials/special3.png', category: 'cutespecials', quantity: 8 },
  { src: 'special/cute specials/special4.png', category: 'cutespecials', quantity: 12 },
  { src: 'special/cute specials/special5.png', category: 'cutespecials', quantity: 18 },
  { src: 'special/cute specials/special6.png', category: 'cutespecials', quantity: 13 },
  { src: 'special/cute specials/special7.png', category: 'cutespecials', quantity: 11 },
  { src: 'special/cute specials/special8.png', category: 'cutespecials', quantity: 13 },
  { src: 'special/cute specials/special9.png', category: 'cutespecials', quantity: 10 },
  { src: 'special/cute specials/special10.png', category: 'cutespecials', quantity: 7 },
  { src: 'special/cute specials/special11.png', category: 'cutespecials', quantity: 6 },
  { src: 'special/cute specials/special12.png', category: 'cutespecials', quantity: 30 },
  { src: 'special/cute specials/special13.png', category: 'cutespecials', quantity: 0 },
  { src: 'special/cute specials/special14.png', category: 'cutespecials', quantity: 1 },
  { src: 'special/cute specials/special15.png', category: 'cutespecials', quantity: 3 },
  { src: 'special/cute specials/special16.png', category: 'cutespecials', quantity: 1 },
  { src: 'special/cute specials/3-gold.png', category: 'cutespecials', quantity: 1 },
  { src: 'special/cute specials/2-gold.png', category: 'cutespecials', quantity: 3 },
  { src: 'special/cute specials/special17.png', category: 'cutespecials', quantity: 7 },
  { src: 'special/cute specials/special18.png', category: 'cutespecials', quantity: 0 },
  { src: 'special/cute specials/special19.png', category: 'cutespecials', quantity: 0 },
  { src: 'special/cute specials/special20.png', category: 'cutespecials', quantity: 0 },
  { src: 'special/cute specials/special21.png', category: 'cutespecials', quantity: 0 },
  { src: 'special/cute specials/special girly.png', category: 'cutespecials', quantity: 5 },
  // cute charms
  { src: 'special/cute/cute.png', category: 'cute', quantity: 0 },
  { src: 'special/cute/cute2.png', category: 'cute', quantity: 0 },
  { src: 'special/cute/cute3.png', category: 'cute', quantity: 0 },
  { src: 'special/cute/cute4.png', category: 'cute', quantity: 0 },
  { src: 'special/cute/cute5.png', category: 'cute', quantity: 2 },
  { src: 'special/cute/cute6.png', category: 'cute', quantity: 0 },
  { src: 'special/cute/cute7.png', category: 'cute', quantity: 0 },
  { src: 'special/cute/cute8.png', category: 'cute', quantity: 1 },
  { src: 'special/cute/cute9.png', category: 'cute', quantity: 0 },
  { src: 'special/cute/cute10.png', category: 'cute', quantity: 0 },
  { src: 'special/cute/cute11.png', category: 'cute', quantity: 0 },
  { src: 'special/cute/cute12.png', category: 'cute', quantity: 1 },
  { src: 'special/cute/cute13.png', category: 'cute', quantity: 0 },
  { src: 'special/cute/cute14.png', category: 'cute', quantity: 0 },
  { src: 'special/cute/cute15.png', category: 'cute', quantity: 0 },
  { src: 'special/cute/cute16.png', category: 'cute', quantity: 0 },
  { src: 'special/cute/cute17.png', category: 'cute', quantity: 1 },
  { src: 'special/cute/cute18.png', category: 'cute', quantity: 2 },
  { src: 'special/cute/cute19.png', category: 'cute', quantity: 1 },
  { src: 'special/cute/cute20.png', category: 'cute', quantity: 1 },
  { src: 'special/cute/cute21.png', category: 'cute', quantity: 1 },
  { src: 'special/cute/cute22.png', category: 'cute', quantity: 1 },
  { src: 'special/cute/cute23.png', category: 'cute', quantity: 1 },
  { src: 'special/cute/cute24.png', category: 'cute', quantity: 1 },
  // mushrooms charms
  { src: 'special/mushrooms/mushroom.png', category: 'mushrooms', quantity: 3 },
  { src: 'special/mushrooms/70-gold.png', category: 'mushrooms', quantity: 4 },
  { src: 'special/mushrooms/71-gold.png', category: 'mushrooms', quantity: 5 },
  { src: 'special/mushrooms/72-gold.png', category: 'mushrooms', quantity: 3 },
  { src: 'special/mushrooms/73-gold.png', category: 'mushrooms', quantity: 2 },
  { src: 'special/mushrooms/mushroom1.png', category: 'mushrooms', quantity: 2 },
  { src: 'special/mushrooms/mushroom2.png', category: 'mushrooms', quantity: 5 },
  { src: 'special/mushrooms/mushroom3.png', category: 'mushrooms', quantity: 4 },
  { src: 'special/mushrooms/mushroom4.png', category: 'mushrooms', quantity: 3 },
  { src: 'special/mushrooms/84-gold.png', category: 'mushrooms', quantity: 1 },
  // red charms
  { src: 'special/red/red.png', category: 'red', quantity: 0 },
  { src: 'special/red/36-gold.png', category: 'red', quantity: 0 },
  { src: 'special/red/37-gold.png', category: 'red', quantity: 0 },
  { src: 'special/red/89-gold.png', category: 'red', quantity: 1 },
  { src: 'special/red/90-gold.png', category: 'red', quantity: 5 },
  { src: 'special/red/92-gold.png', category: 'red', quantity: 2 },
  { src: 'special/red/93-gold.png', category: 'red', quantity: 1 },
  { src: 'special/red/94-gold.png', category: 'red', quantity: 4 },
  { src: 'special/red/95-gold.png', category: 'red', quantity: 0 },
  { src: 'special/red/96-gold.png', category: 'red', quantity: 1 },
  { src: 'special/red/97-gold.png', category: 'red', quantity: 5 },
  { src: 'special/red/98-gold.png', category: 'red', quantity: 2 },
  { src: 'special/red/99-gold.png', category: 'red', quantity: 2 },
  { src: 'special/red/100-gold.png', category: 'red', quantity: 1 },
  { src: 'special/red/101-gold.png', category: 'red', quantity: 2 },
  { src: 'special/red/red1.png', category: 'red', quantity: 2 },
  { src: 'special/red/red2.png', category: 'red', quantity: 5 },
  { src: 'special/red/red3.png', category: 'red', quantity: 1 },
  { src: 'special/red/red4.png', category: 'red', quantity: 2 },
  { src: 'special/red/red5.png', category: 'red', quantity: 2 },
  { src: 'special/red/red6.png', category: 'red', quantity: 1 },
  { src: 'special/red/red7.png', category: 'red', quantity: 2 },
  { src: 'special/red/red8.png', category: 'red', quantity: 1 },
  { src: 'special/red/red9.png', category: 'red', quantity: 4 },
  { src: 'special/red/red10.png', category: 'red', quantity: 5 },
  { src: 'special/red/red11.png', category: 'red', quantity: 1 },
  { src: 'special/red/red12.png', category: 'red', quantity: 2 },
  { src: 'special/new-collection/1.png', category: 'red', quantity: 1 },
  { src: 'special/new-collection/4.png', category: 'red', quantity: 1 },
  { src: 'special/new-collection/6.png', category: 'red', quantity: 1 },
  { src: 'special/new-collection/8.png', category: 'red', quantity:0 },
  { src: 'special/new-collection/2-gold.png', category: 'red', quantity: 1 },
  { src: 'special/new-collection/3-gold.png', category: 'red', quantity: 1 },
  { src: 'special/new-collection/5-gold.png', category: 'red', quantity: 1 },
  { src: 'special/new-collection/12-gold.png', category: 'red', quantity: 0 },
  // teddy charms
  { src: 'special/teddy/teddy.png', category: 'teddy', quantity: 3 },
  { src: 'special/teddy/84-gold.png', category: 'teddy', quantity: 11 },
  { src: 'special/teddy/85-gold.png', category: 'teddy', quantity: 9 },
  { src: 'special/teddy/86-gold.png', category: 'teddy', quantity: 3 },
  { src: 'special/teddy/87-gold.png', category: 'teddy', quantity: 3 },
  { src: 'special/teddy/88-gold.png', category: 'teddy', quantity: 6 },
  { src: 'special/teddy/teddy2.png', category: 'teddy', quantity: 3 },
  { src: 'special/teddy/teddy3.png', category: 'teddy', quantity: 6 },
  { src: 'special/teddy/teddy4.png', category: 'teddy', quantity: 9 },
  { src: 'special/teddy/128-gold.png', category: 'teddy', quantity: 9 },
  { src: 'special/teddy/teddy5.png', category: 'teddy', quantity: 9 },
  { src: 'special/teddy/teddy6.png', category: 'teddy', quantity: 11 },
   // girly charms
  { src: 'special/new-collection/11.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/33.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/29-gold.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/30.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/31-gold.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/33.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/36-gold.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/37.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/38-gold.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/39.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/47-gold.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/48.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/50.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/51-gold.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/53-gold.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/54.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/55-gold.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/58.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/59-gold.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/7.png', category: 'girly', quantity: 1 },
  { src: 'special/new-collection/15-gold.png', category: 'girly', quantity: 1 },
  // fruity charms
  { src: 'special/new-collection/28.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/32-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/34.png', category: 'fruity', quantity: 0 },
  { src: 'special/new-collection/35-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/40.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/41-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/42.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/43-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/44.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/45-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/46.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/49-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/14-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/10.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/11-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/12.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/13.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/14-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/15.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/16-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/17-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/18.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/19-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/20.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/21.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/22-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/23-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/24.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/25-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/26.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/27-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/28.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/29.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/30-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/31.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/32-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/33-gold.png', category: 'fruity', quantity: 0 },
  { src: 'special/new-collection/34.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/35-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/36.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/37-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/38.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/39-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/40.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/41-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/42.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/43-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/44.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/45-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/46.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/47.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/48-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/49-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/50-gold.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/51.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/85.png', category: 'fruity', quantity: 1 },
  { src: 'special/new-collection/9-gold.png', category: 'fruity', quantity: 1 },
  // fun charms
  { src: 'special/new-collection/52.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/56.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/57-gold.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/52.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/53.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/54-gold.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/55.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/56.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/57-gold.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/58-gold.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/59.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/60.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/61-gold.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/82-gold.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/83-gold.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/11x.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/12x.png', category: 'fun', quantity: 1 },
  { src: 'special/new-collection/9x.png', category: 'fun', quantity: 1 },
  // flowers charms
  { src: 'special/new-collection/62.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/63-gold.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/64-gold.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/65.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/66.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/67-gold.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/68-gold.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/69.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/70-gold.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/71.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/72-gold.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/73.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/74-gold.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/75.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/76-gold.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/77.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/78.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/79-gold.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/80.png', category: 'flowers', quantity: 1 },
  { src: 'special/new-collection/81-gold.png', category: 'flowers', quantity: 1 },
  // newc2s charms
  { src: 'special/newc2s/c2103.png', category: 'newc2s', quantity: 0 },
  { src: 'special/newc2s/c2117.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2119.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2129.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2130.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2131.png', category: 'newc2s', quantity: 0 },
  { src: 'special/newc2s/c2134.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2136.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2137.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2138.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2144.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2147.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2150.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c2151-gold.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c2152.png', category: 'newc2s', quantity: 0 },
  { src: 'special/newc2s/c2153.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2154.png', category: 'newc2s', quantity: 0 },
  { src: 'special/newc2s/c2156.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2159.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2160.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2161.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2162.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2163.png', category: 'newc2s', quantity: 0 },
  { src: 'special/newc2s/c2164.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c2166.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c226.png', category: 'newc2s', quantity: 7 },
  { src: 'special/newc2s/c227.png', category: 'newc2s', quantity: 7 },
  { src: 'special/newc2s/c231.png', category: 'newc2s', quantity: 7 },
  { src: 'special/newc2s/c232.png', category: 'newc2s', quantity: 7 },
  { src: 'special/newc2s/c233.png', category: 'newc2s', quantity: 7 },
  { src: 'special/newc2s/c236.png', category: 'newc2s', quantity: 7 },
  { src: 'special/newc2s/c239.png', category: 'newc2s', quantity: 7 },
  { src: 'special/newc2s/c240.png', category: 'newc2s', quantity: 7 },
  { src: 'special/newc2s/c241.png', category: 'newc2s', quantity: 7 },
  { src: 'special/newc2s/c243.png', category: 'newc2s', quantity: 7 },
  { src: 'special/newc2s/c256-gold.png', category: 'newc2s', quantity: 7 },
  { src: 'special/newc2s/c257.png', category: 'newc2s', quantity: 5 },
  { src: 'special/newc2s/c258-gold.png', category: 'newc2s', quantity: 6 },
  { src: 'special/newc2s/c259.png', category: 'newc2s', quantity: 6 },
  { src: 'special/newc2s/c260.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c262-gold.png', category: 'newc2s', quantity: 5 },
  { src: 'special/newc2s/c263.png', category: 'newc2s', quantity: 5 },
  { src: 'special/newc2s/c264-gold.png', category: 'newc2s', quantity: 5 },
  { src: 'special/newc2s/c265.png', category: 'newc2s', quantity: 5 },
  { src: 'special/newc2s/c266-gold.png', category: 'newc2s', quantity: 5 },
  { src: 'special/newc2s/c267.png', category: 'newc2s', quantity: 5 },
  { src: 'special/newc2s/c268-gold.png', category: 'newc2s', quantity: 5 },
  { src: 'special/newc2s/c269.png', category: 'newc2s', quantity: 5 },
  { src: 'special/newc2s/c270-gold.png', category: 'newc2s', quantity: 5 },
  { src: 'special/newc2s/c271.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c272-gold.png', category: 'newc2s', quantity: 5 },
  { src: 'special/newc2s/c273.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c274.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c275-gold.png', category: 'newc2s', quantity: 3 },
  { src: 'special/newc2s/c276-gold.png', category: 'newc2s', quantity: 3 },
  { src: 'special/newc2s/c277.png', category: 'newc2s', quantity: 3 },
  { src: 'special/newc2s/c278-gold.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c279.png', category: 'newc2s', quantity: 3 },
  { src: 'special/newc2s/c280-gold.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c281.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c282-gold.png', category: 'newc2s', quantity: 5 },
  { src: 'special/newc2s/c283.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c284-gold.png', category: 'newc2s', quantity: 0 },
  { src: 'special/newc2s/c285.png', category: 'newc2s', quantity: 0 },
  { src: 'special/newc2s/c286.png', category: 'newc2s', quantity: 5 },
  { src: 'special/newc2s/c287-gold.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c288.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c289-gold.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c290-gold.png', category: 'newc2s', quantity: 3 },
  { src: 'special/newc2s/c291.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c292-gold.png', category: 'newc2s', quantity: 3 },
  { src: 'special/newc2s/c293.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c294.png', category: 'newc2s', quantity: 3 },
  { src: 'special/newc2s/c295-gold.png', category: 'newc2s', quantity: 4 },
  { src: 'special/newc2s/c298.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc2s/c299.png', category: 'newc2s', quantity: 1 },
  { src: 'special/newc4s/c430.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c431.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c432.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c433.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c434.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c435.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c436.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c437.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c438.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c439.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c440.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c441.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c442.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c443.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c444.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c445.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c446.png', category: 'newc4s', quantity: 1 },
  { src: 'special/newc4s/c447.png', category: 'newc4s', quantity: 1 },

  // butterflies charms
];
 }
    
    if (typeof window.rareCharms === 'undefined') {
         window.rareCharms = [
 
  //
  { src: 'rares/new-collection/10.png', category: 'butterflies', quantity: 1 },
  { src: 'rares/new-collection/11-gold.png', category: 'butterflies', quantity: 1 },
  { src: 'rares/new-collection/12.png', category: 'butterflies', quantity: 6 },
  { src: 'rares/new-collection/14.png', category: 'butterflies', quantity: 6 },
  { src: 'rares/new-collection/16.png', category: 'butterflies', quantity: 5 },
  { src: 'rares/new-collection/17-gold.png', category: 'butterflies', quantity: 6 },
  { src: 'rares/new-collection/18.png', category: 'butterflies', quantity: 4 },
  { src: 'rares/new-collection/19-gold.png', category: 'butterflies', quantity: 6 },
  { src: 'rares/new-collection/20x-gold.png', category: 'butterflies', quantity: 5 },
  { src: 'rares/new-collection/21.png', category: 'butterflies', quantity: 5 },
  { src: 'rares/new-collection/22.png', category: 'butterflies', quantity: 5 },
  { src: 'rares/new-collection/23-gold.png', category: 'butterflies', quantity: 5 },
  { src: 'rares/new-collection/24.png', category: 'butterflies', quantity: 5 },
  { src: 'rares/new-collection/25x-gold.png', category: 'butterflies', quantity: 5 },
  { src: 'rares/new-collection/26.png', category: 'butterflies', quantity: 6 },
  { src: 'rares/new-collection/27w-gold.png', category: 'butterflies', quantity: 10 },
  { src: 'rares/new-collection/8.png', category: 'butterflies', quantity: 5 },
  { src: 'rares/new-collection/9-gold.png', category: 'butterflies', quantity: 5 },
  { src: 'rares/new-collection/13x-gold.png', category: 'butterflies', quantity: 6 },
  // random charms
  { src: 'rares/new-collection/21xx.png', category: 'random', quantity: 1 },
  { src: 'rares/new-collection/2x.png', category: 'random', quantity: 1 },
  { src: 'rares/new-collection/4x.png', category: 'random', quantity: 1 },
  { src: 'rares/new-collection/6x.png', category: 'random', quantity: 1 },
  { src: 'rares/newc2r/c2104.png', category: 'random', quantity: 2 },
  { src: 'rares/newc2r/c2122.png', category: 'random', quantity: 1 },
  { src: 'rares/newc2r/c2125.png', category: 'random', quantity: 1 },
  { src: 'rares/newc2r/c2127.png', category: 'random', quantity: 1 },
  { src: 'rares/newc2r/c2133.png', category: 'random', quantity: 1 },
  { src: 'rares/newc2r/c2148.png', category: 'random', quantity: 1 },
  // disney charms
  { src: 'rares/disney/bluemonster.png', category: 'disney', quantity: 2 },
  { src: 'rares/disney/74-gold.png', category: 'disney', quantity: 3 },
  { src: 'rares/disney/75-gold.png', category: 'disney', quantity: 3 },
  { src: 'rares/disney/76-gold.png', category: 'disney', quantity: 5 },
  { src: 'rares/disney/77-gold.png', category: 'disney', quantity: 3 },
  { src: 'rares/disney/78-gold.png', category: 'disney', quantity: 7 },
  { src: 'rares/disney/79-gold.png', category: 'disney', quantity: 6 },
  { src: 'rares/disney/80-gold.png', category: 'disney', quantity: 7 },
  { src: 'rares/disney/81-gold.png', category: 'disney', quantity: 2 },
  { src: 'rares/disney/82-gold.png', category: 'disney', quantity: 2 },
  { src: 'rares/disney/bunny.png', category: 'disney', quantity: 3 },
  { src: 'rares/disney/disneycat pink.png', category: 'disney', quantity: 6 },
  { src: 'rares/disney/disneycat.png', category: 'disney', quantity: 7 },
  { src: 'rares/disney/fox.png', category: 'disney', quantity: 5 },
  { src: 'rares/disney/greenmonster.png', category: 'disney', quantity: 7 },
  { src: 'rares/disney/pinkstitch.png', category: 'disney', quantity: 3 },
  { src: 'rares/disney/snjab.png', category: 'disney', quantity: 2 },
  { src: 'rares/disney/stitch.png', category: 'disney', quantity: 3 },
  // gold charms
  { src: 'rares/gold/gold.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold17.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold2.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold3.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold4.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold6.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold7.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold8.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold9.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold10.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold11.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold12.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold13.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold14.png', category: 'gold', quantity: 0 },
  { src: 'rares/gold/gold15.png', category: 'gold', quantity: 0 },
  { src: 'rares/new-collection/24-gold.png', category: 'gold', quantity: 0 },
  { src: 'rares/new-collection/25-gold.png', category: 'gold', quantity: 0 },
  { src: 'rares/new-collection/26-gold.png', category: 'gold', quantity: 1 },
  { src: 'rares/new-collection/27-gold.png', category: 'gold', quantity: 1 },
  { src: 'rares/new-collection/28-gold.png', category: 'gold', quantity: 0 },
  { src: 'rares/new-collection/29-gold.png', category: 'gold', quantity: 0 },
  { src: 'rares/newc2r/c225-gold.png', category: 'gold', quantity: 0 },
  // night charms
  { src: 'rares/gold/gold5.png', category: 'night', quantity: 0 },
  { src: 'rares/newc2r/c224.png', category: 'night', quantity: 1 },
  { src: 'rares/newc2r/c229.png', category: 'night', quantity: 7 },
  { src: 'rares/newc2r/c230.png', category: 'night', quantity: 7 },
  { src: 'rares/newc2r/c242.png', category: 'night', quantity: 7 },
  { src: 'rares/newc2r/c25.png', category: 'night', quantity: 1 },
  { src: 'rares/newc2r/c26.png', category: 'night', quantity: 1 },
  { src: 'rares/newc2r/c27.png', category: 'night', quantity: 1 },
  { src: 'rares/newc2r/c28.png', category: 'night', quantity: 1 },
  { src: 'rares/newc2r/c212.png', category: 'night', quantity: 1 },
  // graduation charms
  { src: 'rares/graduation/grad.png', category: 'graduation', quantity: 1 },
  // hgs charms
  { src: 'rares/hgs/hgs.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/hgs2.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/hgs3.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/hgs4.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/25.png', category: 'hgs', quantity: 1 },
  { src: 'rares/hgs/20.png', category: 'hgs', quantity: 1 },
  { src: 'rares/hgs/27.png', category: 'hgs', quantity: 1 },
  { src: 'rares/hgs/21.png', category: 'hgs', quantity: 1 },
  { src: 'rares/hgs/22.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/23.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/24.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/26.png', category: 'hgs', quantity: 1 },
  { src: 'rares/hgs/hgs5.png', category: 'hgs', quantity: 1 },
  { src: 'rares/hgs/hgs6.png', category: 'hgs', quantity: 1 },
  { src: 'rares/hgs/hgs7.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/129.png', category: 'hgs', quantity: 1 },
  { src: 'rares/hgs/130.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/hgs9.png', category: 'hgs', quantity: 1 },
  { src: 'rares/hgs/hgs10.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/hgs11.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/hgs12.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/hgs13.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/hgs14.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/hgs15.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/hgs16.png', category: 'hgs', quantity: 0 },
  { src: 'rares/hgs/hgs17.png', category: 'hgs', quantity: 0 },
  { src: 'rares/new-collection/20-gold.png', category: 'hgs', quantity: 1 },
  { src: 'rares/new-collection/csds.png', category: 'hgs', quantity: 5 },
  { src: 'rares/new-collection/sds.png', category: 'hgs', quantity: 0 },
  { src: 'rares/new-collection/xxx.png', category: 'hgs', quantity: 1 },
  { src: 'rares/new-collection/xxxx.png', category: 'hgs', quantity: 0 },
  { src: 'rares/new-collection/10x.png', category: 'hgs', quantity: 0 },
  { src: 'rares/new-collection/3x.png', category: 'hgs', quantity: 0 },
  { src: 'rares/new-collection/5x.png', category: 'hgs', quantity: 1 },
  { src: 'rares/new-collection/7x.png', category: 'hgs', quantity: 1 },
  { src: 'rares/new-collection/13-gold.png', category: 'hgs', quantity: 0 },
  { src: 'rares/newc2r/c210.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c2100.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c2101.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c2102.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c21.png', category: 'hgs', quantity: 1 },
  { src: 'rares/sporty/sporty9.png', category: 'hgs', quantity: 0 },
  { src: 'rares/newc2r/c2105.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c2110.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c2112.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c2113.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c2114.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c2116.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c2118.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c2126.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c2143.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c215.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c217.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c23.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c234.png', category: 'hgs', quantity: 7 },
  { src: 'rares/newc2r/c235.png', category: 'hgs', quantity: 7 },
  { src: 'rares/newc2r/c237.png', category: 'hgs', quantity: 7 },
  { src: 'rares/newc2r/c238.png', category: 'hgs', quantity: 7 },
  { src: 'rares/newc2r/c244.png', category: 'hgs', quantity: 0 },
  { src: 'rares/newc2r/c245.png', category: 'hgs', quantity: 0 },
  { src: 'rares/newc2r/c24-gold.png', category: 'hgs', quantity: 0 },
  { src: 'rares/newc2r/c255-gold.png', category: 'hgs', quantity: 6 },
  { src: 'rares/newc2r/c29-gold.png', category: 'hgs', quantity: 0 },
  { src: 'rares/newc2r/c246.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c248.png', category: 'hgs', quantity: 0 },
  { src: 'rares/newc2r/c249.png', category: 'hgs', quantity: 0 },
  { src: 'rares/newc2r/c254.png', category: 'hgs', quantity: 6 },
  { src: 'rares/newc2r/c220.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c222.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c223.png', category: 'hgs', quantity: 1 },
  { src: 'rares/newc2r/c22.png', category: 'hgs', quantity: 0 },
  // long charms
  { src: 'rares/long/long.png', category: 'long', quantity: 4 },
  { src: 'rares/long/long2.png', category: 'long', quantity: 0},
  { src: 'rares/long/c410.png', category: 'long', quantity: 0 },
  // love charms
  { src: 'rares/love/best.png', category: 'love', quantity: 1 },
  { src: 'rares/love/ends.png', category: 'love', quantity: 1 },
  { src: 'rares/love/fri.png', category: 'love', quantity: 1 },
  { src: 'rares/love/6.png', category: 'love', quantity: 1 },
  { src: 'rares/love/7.png', category: 'love', quantity: 1 },
  { src: 'rares/love/19.png', category: 'love', quantity: 1 },
  { src: 'rares/love/love.png', category: 'love', quantity: 1 },
  { src: 'rares/love/love2.png', category: 'love', quantity: 1 },
  { src: 'rares/love/love3.png', category: 'love', quantity: 0 },
  { src: 'rares/love/love4.png', category: 'love', quantity: 0 },
  { src: 'rares/love/love5.png', category: 'love', quantity: 0 },
  { src: 'rares/love/love6.png', category: 'love', quantity: 0 },
  { src: 'rares/love/love7.png', category: 'love', quantity: 0 },
  { src: 'rares/love/love8.png', category: 'love', quantity: 3 },
  { src: 'rares/love/love9.png', category: 'love', quantity: 1 },
  { src: 'rares/love/love10.png', category: 'love', quantity: 0 },
  { src: 'rares/love/love11.png', category: 'love', quantity:0 },
  { src: 'rares/love/mrmrs1.png', category: 'love', quantity: 1 },
  { src: 'rares/love/mrmrs2.png', category: 'love', quantity: 1 },
  { src: 'rares/love/c218.png', category: 'love', quantity: 1 },
  { src: 'rares/love/c219.png', category: 'love', quantity: 1 },
  { src: 'rares/newc2r/c2120.png', category: 'love', quantity: 1 },
  { src: 'rares/newc2r/c2124.png', category: 'love', quantity: 0},
  { src: 'rares/newc2r/c2146.png', category: 'love', quantity: 1 },
  { src: 'rares/newc2r/c2149.png', category: 'love', quantity: 0 },
  { src: 'rares/newc2r/c228.png', category: 'love', quantity: 7 },
  { src: 'rares/newc2r/c247.png', category: 'love', quantity: 1 },
  { src: 'rares/newc2r/c221.png', category: 'love', quantity: 1 },
  // sanrio charms
  { src: 'rares/sanrio/50-gold.png', category: 'sanrio', quantity: 11 },
  { src: 'rares/sanrio/51.png', category: 'sanrio', quantity: 10 },
  { src: 'rares/sanrio/51-gold.png', category: 'sanrio', quantity: 11 },
  { src: 'rares/sanrio/52.png', category: 'sanrio', quantity: 10 },
  { src: 'rares/sanrio/52-gold.png', category: 'sanrio', quantity: 9 },
  { src: 'rares/sanrio/53.png', category: 'sanrio', quantity: 10 },
  { src: 'rares/sanrio/53-gold.png', category: 'sanrio', quantity: 10 },
  { src: 'rares/sanrio/54.png', category: 'sanrio', quantity: 10 },
  { src: 'rares/sanrio/54-gold.png', category: 'sanrio', quantity: 11 },
  { src: 'rares/sanrio/55.png', category: 'sanrio', quantity: 11 },
  { src: 'rares/sanrio/55-gold.png', category: 'sanrio', quantity: 11 },
  { src: 'rares/sanrio/56.png', category: 'sanrio', quantity: 11 },
  { src: 'rares/sanrio/56-gold.png', category: 'sanrio', quantity: 9 },
  { src: 'rares/sanrio/57.png', category: 'sanrio', quantity: 9 },
  { src: 'rares/sanrio/57-gold.png', category: 'sanrio', quantity: 11 },
  { src: 'rares/sanrio/58.png', category: 'sanrio', quantity: 11 },
  { src: 'rares/sanrio/58-gold.png', category: 'sanrio', quantity: 7 },
  { src: 'rares/sanrio/59.png', category: 'sanrio', quantity: 7 },
  { src: 'rares/sanrio/59-gold.png', category: 'sanrio', quantity: 11 },
  { src: 'rares/sanrio/60.png', category: 'sanrio', quantity: 11 },
  { src: 'rares/sanrio/60-gold.png', category: 'sanrio', quantity: 12 },
  { src: 'rares/sanrio/61.png', category: 'sanrio', quantity: 11 },
  { src: 'rares/sanrio/61-gold.png', category: 'sanrio', quantity: 10 },
  { src: 'rares/sanrio/62.png', category: 'sanrio', quantity: 10 },
  { src: 'rares/sanrio/metalkitty.png', category: 'sanrio', quantity: 9 },
  { src: 'rares/sanrio/83-gold.png', category: 'sanrio', quantity: 9 },
  // sporty charms
  { src: 'rares/sporty/sporty.png', category: 'sporty', quantity: 0 },
  { src: 'rares/sporty/18-gold.png', category: 'sporty', quantity: 0 },
  { src: 'rares/sporty/sporty2.png', category: 'sporty', quantity: 0 },
  { src: 'rares/sporty/sporty3.png', category: 'sporty', quantity: 4 },
  { src: 'rares/sporty/sporty4.png', category: 'sporty', quantity: 0 },
  { src: 'rares/sporty/sporty5.png', category: 'sporty', quantity: 0 },
  { src: 'rares/sporty/sporty6.png', category: 'sporty', quantity: 0 },
  { src: 'rares/sporty/sporty7.png', category: 'sporty', quantity: 2 },
  { src: 'rares/sporty/sporty8.png', category: 'sporty', quantity: 0 },
  { src: 'rares/sporty/30.png', category: 'sporty', quantity: 1 },
  { src: 'rares/sporty/sporty9.png', category: 'sporty', quantity: 0 },
  { src: 'rares/sporty/sporty10.png', category: 'sporty', quantity: 1 },
  { src: 'rares/sporty/sporty11.png', category: 'sporty', quantity: 1 },
  { src: 'rares/sporty/sporty12.png', category: 'sporty', quantity: 0 },
  { src: 'rares/sporty/sporty13.png', category: 'sporty', quantity: 0 },
  { src: 'rares/sporty/sporty14.png', category: 'sporty', quantity: 0 },
  { src: 'rares/sporty/sporty15.png', category: 'sporty', quantity: 1 },
  { src: 'rares/sporty/29.png', category: 'sporty', quantity: 1 },
  { src: 'rares/sporty/31.png', category: 'sporty', quantity: 0 },
  { src: 'rares/new-collection/8x.png', category: 'sporty', quantity: 0 },
  { src: 'rares/newc2r/c2111.png', category: 'sporty', quantity: 1 },
  // dangly charms
  { src: 'rares/dangly/10.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/100-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/101.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/102-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/103.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/104-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/105.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/106-gold.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/107.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/108.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/109-gold.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/11.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/110-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/111.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/112.png', category: 'dangly', quantity: 5 },
  { src: 'rares/dangly/113.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/114.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/115-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/116.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/117-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/118-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/119.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/12-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/120-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/121.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/122-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/123.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/124.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/125-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/126.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/127-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/128.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/129.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/13.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/130-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/131-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/132.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/133-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/134.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/135-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/136.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/137-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/138.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/139-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/14-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/140.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/141-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/142.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/143-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/144.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/145-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/146.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/147-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/148.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/149-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/15-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/150.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/151-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/152.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/153.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/154.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/155-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/156-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/157-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/158.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/159-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/16.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/160.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/161-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/162.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/163-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/164.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/165-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/166.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/167-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/168.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/169-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/170.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/171-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/172.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/173-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/174.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/175-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/176.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/177-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/178.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/179-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/180.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/181-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/182.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/183-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/184.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/185-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/186.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/187.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/188-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/189-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/190.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/191.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/192-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/193.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/194-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/195.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/63-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/64-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/65-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/66-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/67-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/68.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/70.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/71.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/72.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/73.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/74-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/75-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/76-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/77-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/78-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/79.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/80.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/81-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/82.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/83.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/84-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/85.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/86.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/87-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/88-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/89-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/9-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/90.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/91.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/92.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/93.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/94-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/95.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/96-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/97.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/98-gold.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/99.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/dangly.png', category: 'dangly', quantity: 3 },
  { src: 'rares/dangly/16s.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/17.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/18-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/19-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2167.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2168-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2169.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/c2171-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/c2172.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/c2173-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/c2174-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2175.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2176.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/c2177-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/c2178.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2179-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2180.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/c2181-gold.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/c2182.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2183-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2184.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/c2185-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/c2186.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2187-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2188.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/c2189-gold.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/c2190.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/c2191-gold.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/c2192.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2193-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2194.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/c2195-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/c2196-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2197.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2198.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/c2199-gold.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/c2200.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/c2201-gold.png', category: 'dangly', quantity: 2 },
  { src: 'rares/dangly/c2202-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2203.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2204.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2205-gold.png', category: 'dangly', quantity: 1 },
  { src: 'rares/dangly/c2206.png', category: 'dangly', quantity: 0 },
  { src: 'rares/dangly/c2207-gold.png', category: 'dangly', quantity: 0 },
  // pets charms
  { src: 'rares/newc2r/c2145.png', category: 'pets', quantity: 1 },
  { src: 'rares/newc2r/c2135.png', category: 'pets', quantity: 0 },
  { src: 'rares/newc2r/c2115.png', category: 'pets', quantity: 1 },
  { src: 'rares/newc2r/c2107.png', category: 'pets', quantity: 1 },
  { src: 'rares/newc2r/c2108.png', category: 'pets', quantity: 1 },
  { src: 'rares/newc2r/c2106.png', category: 'pets', quantity: 1 },
  { src: 'rares/newc2r/c216.png', category: 'pets', quantity: 1 },
  { src: 'rares/newc2r/c297.png', category: 'pets', quantity: 1 },
  // rcute charms
  { src: 'rares/newc2r/c250.png', category: 'rcute', quantity: 5 },
  { src: 'rares/newc2r/c252.png', category: 'rcute', quantity: 5 },
  { src: 'rares/newc2r/c2128.png', category: 'rcute', quantity: 0 },
  { src: 'rares/newc2r/c211.png', category: 'rcute', quantity: 1 },
  { src: 'rares/newc2r/c2121.png', category: 'rcute', quantity: 1 },
  { src: 'rares/newc2r/c213.png', category: 'rcute', quantity: 1 },
  { src: 'rares/newc2r/c2139.png', category: 'rcute', quantity: 1 },
  { src: 'rares/newc2r/c214.png', category: 'rcute', quantity: 0 },
  { src: 'rares/newc2r/c2142.png', category: 'rcute', quantity: 1 },
  { src: 'rares/newc2r/c2109.png', category: 'rcute', quantity: 1 },
  { src: 'rares/newc2r/c251-gold.png', category: 'rcute', quantity: 5 },
  { src: 'rares/newc2r/c253-gold.png', category: 'rcute', quantity: 5 },
  { src: 'rares/newc2r/c296.png', category: 'rcute', quantity: 1 },
  // funny charms
  { src: 'rares/newc2r/c2132.png', category: 'funny', quantity: 1 },
  { src: 'rares/newc2r/c261.png', category: 'funny', quantity: 1 },
  // careers charms
  { src: 'rares/newc2r/c2140.png', category: 'careers', quantity: 1 },
  { src: 'rares/newc2r/c2141.png', category: 'careers', quantity: 1 },
  // newc3r charms
  { src: 'rares/newc3r/c31.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c310.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c311.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c312.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c313.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c314.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c315.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c316.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c317.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c318.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c32.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c33.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c34.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c35.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c36.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c37.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c38.png', category: 'newc3r', quantity: 1 },
  { src: 'rares/newc3r/c39.png', category: 'newc3r', quantity: 1 },
  // newc4r charms
  { src: 'rares/newc4r/c41.png', category: 'newc4r', quantity: 1 },
  { src: 'rares/newc4r/c42.png', category: 'newc4r', quantity: 1 },
  { src: 'rares/newc4r/c43.png', category: 'newc4r', quantity: 1 },
  { src: 'rares/newc4r/c44.png', category: 'newc4r', quantity: 1 },
  { src: 'rares/newc4r/c45.png', category: 'newc4r', quantity: 1 },
  { src: 'rares/newc4r/c46.png', category: 'newc4r', quantity: 1 },
  { src: 'rares/newc4r/c47.png', category: 'newc4r', quantity: 1 },
  { src: 'rares/newc4r/c48.png', category: 'newc4r', quantity: 1 },
  { src: 'rares/newc4r/c49.png', category: 'newc4r', quantity: 1 },

  { src: 'rares/dangly/c4c4107-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4108.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4109.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4110-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4111.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4112-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4113-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4114.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4115-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4116.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4117-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4118.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4120.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4121-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4122.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4123-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4124.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4125-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4126.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4127-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4128.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4129-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4130.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4131-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4132.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4133-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4134.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4135-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4136.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4137-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4138.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4139-gold.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c4140.png', category: 'dangly', quantity: 1 },
{ src: 'rares/dangly/c4c5141-gold.png', category: 'dangly', quantity: 1 },
  {src:'rares/newc2r/c2142.png', category: 'winter', quantity: 1},
{src:'rares/newc2r/c28.png', category: 'winter', quantity: 1},
{src:'rares/newc2r/c229.png', category: 'winter', quantity: 1},
{src:'rares/newc2r/c2125.png', category: 'winter', quantity: 1},
{src:'rares/new-collection/2x.png', category: 'winter', quantity: 1},
{src:'special/newc2s/c2155.png', category: 'winter', quantity: 1},
{src:'special/newc2s/c2157.png', category: 'winter', quantity: 1},
{src:'special/newc2s/c2165.png', category: 'winter', quantity: 1},
{src:'special/newc2s/c2158.png', category: 'winter', quantity: 1},
  {src:'rares/winter/30.png', category: 'winter', quantity: 1},
{src:'rares/winter/31.png', category: 'winter', quantity: 1},
{src:'rares/winter/32.png', category: 'winter', quantity: 1},
{src:'rares/winter/33.png', category: 'winter', quantity: 1},
{src:'rares/winter/34.png', category: 'winter', quantity: 1},
{src:'rares/winter/35.png', category: 'winter', quantity: 1},
{src:'rares/winter/36.png', category: 'winter', quantity: 1},
{src:'rares/winter/37.png', category: 'winter', quantity: 1},
{src:'rares/winter/38.png', category: 'winter', quantity: 1},
{src:'rares/winter/39.png', category: 'winter', quantity: 1},
{src:'rares/winter/40.png', category: 'winter', quantity: 1},
{src:'rares/winter/41.png', category: 'winter', quantity: 1},
{src:'rares/winter/42.png', category: 'winter', quantity: 1},
{src:'rares/winter/43.png', category: 'winter', quantity: 1},
{src:'rares/winter/44.png', category: 'winter', quantity: 1},
{src:'rares/winter/45.png', category: 'winter', quantity: 1},
{src:'rares/winter/46.png', category: 'winter', quantity: 1},
{src:'rares/winter/47.png', category: 'winter', quantity: 1},
{src:'rares/winter/48.png', category: 'winter', quantity: 1},
{src:'rares/winter/49.png', category: 'winter', quantity: 1},
{src:'rares/winter/50.png', category: 'winter', quantity: 1},
{src:'rares/winter/51.png', category: 'winter', quantity: 1},
{src:'rares/winter/52.png', category: 'winter', quantity: 1},
{src:'rares/winter/53.png', category: 'winter', quantity: 1},
{src:'rares/winter/54.png', category: 'winter', quantity: 1},
{src:'rares/winter/55.png', category: 'winter', quantity: 1},




];
}
    
     // Add LEGO pieces data
    if (typeof window.legoPieces === 'undefined') {
        window.legoPieces = [
  {
    "id": 0,
    "path": "hairs/4105175_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 1,
    "path": "hairs/4105175_1.png", 
    "price":2,
    "category":  "hairs"
  },
  {
    "id": 2,
    "path": "hairs/4157108_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 3,
    "path": "hairs/4157108_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 4,
    "path": "hairs/4506003_0 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 5,
    "path": "hairs/4506003_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 6,
    "path": "hairs/4506003_1 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 7,
    "path": "hairs/4506003_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 8,
    "path": "hairs/4527065_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 9,
    "path": "hairs/4527065_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 10,
    "path": "hairs/4550736_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 11,
    "path": "hairs/4550736_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 12,
    "path": "hairs/4610232_0 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 13,
    "path": "hairs/4610232_0 (2).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 14,
    "path": "hairs/4610232_0 (3).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 15,
    "path": "hairs/4610232_1 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 16,
    "path": "hairs/4610232_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 17,
    "path": "hairs/6004435_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 18,
    "path": "hairs/6004435_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 19,
    "path": "hairs/6079896_0 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 20,
    "path": "hairs/6079896_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 21,
    "path": "hairs/6079896_1 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 22,
    "path": "hairs/6079896_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 23,
    "path": "hairs/6092833_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 24,
    "path": "hairs/6092833_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 25,
    "path": "hairs/6097049_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 26,
    "path": "hairs/6097049_1 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 27,
    "path": "hairs/6097049_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 28,
    "path": "hairs/6115306_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 29,
    "path": "hairs/6115306_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 30,
    "path": "hairs/6135555_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 31,
    "path": "hairs/6135555_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 32,
    "path": "hairs/6184572_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 33,
    "path": "hairs/6184572_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 34,
    "path": "hairs/6267760_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 35,
    "path": "hairs/6267760_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 36,
    "path": "hairs/6302680_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 37,
    "path": "hairs/6302680_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 38,
    "path": "hairs/6309172_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 39,
    "path": "hairs/6309172_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 40,
    "path": "hairs/6359884_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 41,
    "path": "hairs/6359884_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 42,
    "path": "hairs/6359887_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 43,
    "path": "hairs/6359887_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 44,
    "path": "hairs/6391869_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 45,
    "path": "hairs/6391869_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 46,
    "path": "hairs/6396165_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 47,
    "path": "hairs/6396165_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 48,
    "path": "hairs/6400296_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 49,
    "path": "hairs/6400296_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 50,
    "path": "hairs/6407188_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 51,
    "path": "hairs/6407188_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 52,
    "path": "hairs/6408118_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 53,
    "path": "hairs/6408118_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 54,
    "path": "hairs/6409765_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 55,
    "path": "hairs/6409765_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 56,
    "path": "hairs/6413079_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 57,
    "path": "hairs/6413079_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 58,
    "path": "hairs/6413913_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 59,
    "path": "hairs/6413913_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 60,
    "path": "hairs/6430540_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 61,
    "path": "hairs/6430540_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 62,
    "path": "hairs/6459549_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 63,
    "path": "hairs/6459549_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 64,
    "path": "hairs/6466049_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 65,
    "path": "hairs/6466049_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 66,
    "path": "hairs/6468541_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 67,
    "path": "hairs/6468541_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 68,
    "path": "hairs/6491486_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 69,
    "path": "hairs/6491486_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 70,
    "path": "hairs/6494721_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 71,
    "path": "hairs/6494721_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 72,
    "path": "hairs/6510956_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 73,
    "path": "hairs/6510956_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 74,
    "path": "hairs/display_4105175_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 75,
    "path": "hairs/display_4105175_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 76,
    "path": "hairs/display_4157108_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 77,
    "path": "hairs/display_4157108_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 78,
    "path": "hairs/display_4506003_0 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 79,
    "path": "hairs/display_4506003_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 80,
    "path": "hairs/display_4506003_1 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 81,
    "path": "hairs/display_4506003_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 82,
    "path": "hairs/display_4527065_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 83,
    "path": "hairs/display_4527065_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 84,
    "path": "hairs/display_4550736_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 85,
    "path": "hairs/display_4550736_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 86,
    "path": "hairs/display_4610232_0 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 87,
    "path": "hairs/display_4610232_0 (2).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 88,
    "path": "hairs/display_4610232_0 (3).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 89,
    "path": "hairs/display_4610232_1 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 90,
    "path": "hairs/display_4610232_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 91,
    "path": "hairs/display_6004435_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 92,
    "path": "hairs/display_6004435_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 93,
    "path": "hairs/display_6079896_0 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 94,
    "path": "hairs/display_6079896_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 95,
    "path": "hairs/display_6079896_1 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 96,
    "path": "hairs/display_6079896_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 97,
    "path": "hairs/display_6092833_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 98,
    "path": "hairs/display_6092833_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 99,
    "path": "hairs/display_6097049_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 100,
    "path": "hairs/display_6097049_1 (1).png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 101,
    "path": "hairs/display_6097049_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 102,
    "path": "hairs/display_6115306_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 103,
    "path": "hairs/display_6115306_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 104,
    "path": "hairs/display_6135555_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 105,
    "path": "hairs/display_6135555_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 106,
    "path": "hairs/display_6184572_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 107,
    "path": "hairs/display_6184572_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 108,
    "path": "hairs/display_6267760_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 109,
    "path": "hairs/display_6267760_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 110,
    "path": "hairs/display_6302680_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 111,
    "path": "hairs/display_6302680_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 112,
    "path": "hairs/display_6309172_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 113,
    "path": "hairs/display_6309172_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 114,
    "path": "hairs/display_6359884_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 115,
    "path": "hairs/display_6359884_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 116,
    "path": "hairs/display_6359887_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 117,
    "path": "hairs/display_6359887_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 118,
    "path": "hairs/display_6391869_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 119,
    "path": "hairs/display_6391869_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 120,
    "path": "hairs/display_6396165_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 121,
    "path": "hairs/display_6396165_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 122,
    "path": "hairs/display_6400296_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 123,
    "path": "hairs/display_6400296_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 124,
    "path": "hairs/display_6407188_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 125,
    "path": "hairs/display_6407188_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 126,
    "path": "hairs/display_6408118_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 127,
    "path": "hairs/display_6408118_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 128,
    "path": "hairs/display_6409765_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 129,
    "path": "hairs/display_6409765_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 130,
    "path": "hairs/display_6413079_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 131,
    "path": "hairs/display_6413079_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 132,
    "path": "hairs/display_6413913_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 133,
    "path": "hairs/display_6413913_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 134,
    "path": "hairs/display_6430540_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 135,
    "path": "hairs/display_6430540_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 136,
    "path": "hairs/display_6459549_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 137,
    "path": "hairs/display_6459549_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 138,
    "path": "hairs/display_6466049_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 139,
    "path": "hairs/display_6466049_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 140,
    "path": "hairs/display_6468541_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 141,
    "path": "hairs/display_6468541_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 142,
    "path": "hairs/display_6491486_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 143,
    "path": "hairs/display_6491486_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 144,
    "path": "hairs/display_6494721_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 145,
    "path": "hairs/display_6494721_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 146,
    "path": "hairs/display_6510956_0.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 147,
    "path": "hairs/display_6510956_1.png", 
    "price":0,
    "category":  "hairs"
  },
  {
    "id": 148,
    "path": "torsos/display_torsos0_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 149,
    "path": "torsos/display_torsos0_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 150,
    "path": "torsos/display_torsos10_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 151,
    "path": "torsos/display_torsos10_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 152,
    "path": "torsos/display_torsos11_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 153,
    "path": "torsos/display_torsos11_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 154,
    "path": "torsos/display_torsos12_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 155,
    "path": "torsos/display_torsos12_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 156,
    "path": "torsos/display_torsos13_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 157,
    "path": "torsos/display_torsos13_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 158,
    "path": "torsos/display_torsos14_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 159,
    "path": "torsos/display_torsos14_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 160,
    "path": "torsos/display_torsos15_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 161,
    "path": "torsos/display_torsos15_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 162,
    "path": "torsos/display_torsos16_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 163,
    "path": "torsos/display_torsos16_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 164,
    "path": "torsos/display_torsos17_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 165,
    "path": "torsos/display_torsos17_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 166,
    "path": "torsos/display_torsos18_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 167,
    "path": "torsos/display_torsos18_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 168,
    "path": "torsos/display_torsos19_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 169,
    "path": "torsos/display_torsos19_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 170,
    "path": "torsos/display_torsos1_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 171,
    "path": "torsos/display_torsos1_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 172,
    "path": "torsos/display_torsos20_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 173,
    "path": "torsos/display_torsos20_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 174,
    "path": "torsos/display_torsos21_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 175,
    "path": "torsos/display_torsos21_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 176,
    "path": "torsos/display_torsos22_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 177,
    "path": "torsos/display_torsos22_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 178,
    "path": "torsos/display_torsos23_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 179,
    "path": "torsos/display_torsos23_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 180,
    "path": "torsos/display_torsos24_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 181,
    "path": "torsos/display_torsos24_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 182,
    "path": "torsos/display_torsos25_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 183,
    "path": "torsos/display_torsos25_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 184,
    "path": "torsos/display_torsos26_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 185,
    "path": "torsos/display_torsos26_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 186,
    "path": "torsos/display_torsos27_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 187,
    "path": "torsos/display_torsos27_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 188,
    "path": "torsos/display_torsos28_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 189,
    "path": "torsos/display_torsos28_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 190,
    "path": "torsos/display_torsos29_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 191,
    "path": "torsos/display_torsos29_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 192,
    "path": "torsos/display_torsos2_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 193,
    "path": "torsos/display_torsos2_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 194,
    "path": "torsos/display_torsos3_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 195,
    "path": "torsos/display_torsos3_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 196,
    "path": "torsos/display_torsos4_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 197,
    "path": "torsos/display_torsos4_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 198,
    "path": "torsos/display_torsos5_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 199,
    "path": "torsos/display_torsos5_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 200,
    "path": "torsos/display_torsos6_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 201,
    "path": "torsos/display_torsos6_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 202,
    "path": "torsos/display_torsos7_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 203,
    "path": "torsos/display_torsos7_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 204,
    "path": "torsos/display_torsos8_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 205,
    "path": "torsos/display_torsos8_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 206,
    "path": "torsos/display_torsos9_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 207,
    "path": "torsos/display_torsos9_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 208,
    "path": "torsos/torsos0_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 209,
    "path": "torsos/torsos0_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 210,
    "path": "torsos/torsos10_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 211,
    "path": "torsos/torsos10_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 212,
    "path": "torsos/torsos11_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 213,
    "path": "torsos/torsos11_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 214,
    "path": "torsos/torsos12_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 215,
    "path": "torsos/torsos12_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 216,
    "path": "torsos/torsos13_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 217,
    "path": "torsos/torsos13_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 218,
    "path": "torsos/torsos14_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 219,
    "path": "torsos/torsos14_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 220,
    "path": "torsos/torsos15_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 221,
    "path": "torsos/torsos15_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 222,
    "path": "torsos/torsos16_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 223,
    "path": "torsos/torsos16_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 224,
    "path": "torsos/torsos17_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 225,
    "path": "torsos/torsos17_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 226,
    "path": "torsos/torsos18_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 227,
    "path": "torsos/torsos18_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 228,
    "path": "torsos/torsos19_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 229,
    "path": "torsos/torsos19_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 230,
    "path": "torsos/torsos1_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 231,
    "path": "torsos/torsos1_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 232,
    "path": "torsos/torsos20_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 233,
    "path": "torsos/torsos20_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 234,
    "path": "torsos/torsos21_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 235,
    "path": "torsos/torsos21_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 236,
    "path": "torsos/torsos22_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 237,
    "path": "torsos/torsos22_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 238,
    "path": "torsos/torsos23_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 239,
    "path": "torsos/torsos23_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 240,
    "path": "torsos/torsos24_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 241,
    "path": "torsos/torsos24_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 242,
    "path": "torsos/torsos25_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 243,
    "path": "torsos/torsos25_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 244,
    "path": "torsos/torsos26_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 245,
    "path": "torsos/torsos26_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 246,
    "path": "torsos/torsos27_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 247,
    "path": "torsos/torsos27_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 248,
    "path": "torsos/torsos28_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 249,
    "path": "torsos/torsos28_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 250,
    "path": "torsos/torsos29_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 251,
    "path": "torsos/torsos29_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 252,
    "path": "torsos/torsos2_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 253,
    "path": "torsos/torsos2_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 254,
    "path": "torsos/torsos3_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 255,
    "path": "torsos/torsos3_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 256,
    "path": "torsos/torsos4_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 257,
    "path": "torsos/torsos4_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 258,
    "path": "torsos/torsos5_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 259,
    "path": "torsos/torsos5_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 260,
    "path": "torsos/torsos6_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 261,
    "path": "torsos/torsos6_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 262,
    "path": "torsos/torsos7_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 263,
    "path": "torsos/torsos7_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 264,
    "path": "torsos/torsos8_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 265,
    "path": "torsos/torsos8_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 266,
    "path": "torsos/torsos9_0.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 267,
    "path": "torsos/torsos9_1.png", 
    "price":0,
    "category":  "torsos"
  },
  {
    "id": 268,
    "path": "legs/4120158_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 269,
    "path": "legs/4120158_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 270,
    "path": "legs/4162916_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 271,
    "path": "legs/4162916_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 272,
    "path": "legs/4222693_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 273,
    "path": "legs/4222693_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 274,
    "path": "legs/4226869_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 275,
    "path": "legs/4226869_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 276,
    "path": "legs/4227657_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 277,
    "path": "legs/4227657_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 278,
    "path": "legs/4529672_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 279,
    "path": "legs/4529672_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 280,
    "path": "legs/6215422_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 281,
    "path": "legs/6215422_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 282,
    "path": "legs/display_4120158_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 283,
    "path": "legs/display_4120158_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 284,
    "path": "legs/display_4162916_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 285,
    "path": "legs/display_4162916_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 286,
    "path": "legs/display_4222693_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 287,
    "path": "legs/display_4222693_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 288,
    "path": "legs/display_4226869_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 289,
    "path": "legs/display_4226869_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 290,
    "path": "legs/display_4227657_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 291,
    "path": "legs/display_4227657_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 292,
    "path": "legs/display_4529672_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 293,
    "path": "legs/display_4529672_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 294,
    "path": "legs/display_6215422_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 295,
    "path": "legs/display_6215422_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 296,
    "path": "legs/display_pants0_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 297,
    "path": "legs/display_pants0_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 298,
    "path": "legs/display_pants1_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 299,
    "path": "legs/display_pants1_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 300,
    "path": "legs/display_pants2_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 301,
    "path": "legs/display_pants2_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 302,
    "path": "legs/display_pants3_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 303,
    "path": "legs/display_pants3_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 304,
    "path": "legs/display_pants4_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 305,
    "path": "legs/display_pants4_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 306,
    "path": "legs/display_pants5_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 307,
    "path": "legs/display_pants5_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 308,
    "path": "legs/display_pants6_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 309,
    "path": "legs/display_pants6_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 310,
    "path": "legs/display_pants7_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 311,
    "path": "legs/display_pants7_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 312,
    "path": "legs/pants0_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 313,
    "path": "legs/pants0_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 314,
    "path": "legs/pants1_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 315,
    "path": "legs/pants1_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 316,
    "path": "legs/pants2_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 317,
    "path": "legs/pants2_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 318,
    "path": "legs/pants3_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 319,
    "path": "legs/pants3_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 320,
    "path": "legs/pants4_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 321,
    "path": "legs/pants4_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 322,
    "path": "legs/pants5_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 323,
    "path": "legs/pants5_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 324,
    "path": "legs/pants6_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 325,
    "path": "legs/pants6_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 326,
    "path": "legs/pants7_0.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 327,
    "path": "legs/pants7_1.png", 
    "price":0,
    "category":  "legs"
  },
  {
    "id": 328,
    "path": "faces/display_white_10_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 329,
    "path": "faces/display_white_11_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 330,
    "path": "faces/display_white_12_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 331,
    "path": "faces/display_white_13_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 332,
    "path": "faces/display_white_14_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 333,
    "path": "faces/display_white_15_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 334,
    "path": "faces/display_white_16_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 335,
    "path": "faces/display_white_17_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 336,
    "path": "faces/display_white_18_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 337,
    "path": "faces/display_white_19_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 338,
    "path": "faces/display_white_22_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 339,
    "path": "faces/display_white_26_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 340,
    "path": "faces/display_white_5_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 341,
    "path": "faces/display_white_6_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 342,
    "path": "faces/display_white_7_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 343,
    "path": "faces/display_white_8_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 344,
    "path": "faces/display_white_9_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 345,
    "path": "faces/display_yellow_1_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 346,
    "path": "faces/display_yellow_20_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 347,
    "path": "faces/display_yellow_21_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 348,
    "path": "faces/display_yellow_23_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 349,
    "path": "faces/display_yellow_24_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 350,
    "path": "faces/display_yellow_25_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 351,
    "path": "faces/display_yellow_27_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 352,
    "path": "faces/display_yellow_28_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 353,
    "path": "faces/display_yellow_29_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 354,
    "path": "faces/display_yellow_30_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 355,
    "path": "faces/white_1.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 356,
    "path": "faces/white_10_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 357,
    "path": "faces/white_11_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 358,
    "path": "faces/white_12_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 359,
    "path": "faces/white_13_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 360,
    "path": "faces/white_14_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 361,
    "path": "faces/white_15_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 362,
    "path": "faces/white_16_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 363,
    "path": "faces/white_17_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 364,
    "path": "faces/white_18_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 365,
    "path": "faces/white_19_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 366,
    "path": "faces/white_22_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 367,
    "path": "faces/white_26_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 368,
    "path": "faces/white_5_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 369,
    "path": "faces/white_6_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 370,
    "path": "faces/white_7_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 371,
    "path": "faces/white_8_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 372,
    "path": "faces/white_9_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 373,
    "path": "faces/yellow_1.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 374,
    "path": "faces/yellow_1_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 375,
    "path": "faces/yellow_20_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 376,
    "path": "faces/yellow_21_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 377,
    "path": "faces/yellow_23_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 378,
    "path": "faces/yellow_24_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 379,
    "path": "faces/yellow_25_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 380,
    "path": "faces/yellow_27_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 381,
    "path": "faces/yellow_28_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 382,
    "path": "faces/yellow_29_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 383,
    "path": "faces/yellow_30_0.png", 
    "price":0,
    "category":  "faces"
  },
  {
    "id": 384,
    "path": "accessories/383526_0.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 385,
    "path": "accessories/383526_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 386,
    "path": "accessories/452226_0.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 387,
    "path": "accessories/452226_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 388,
    "path": "accessories/4550170_0.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 389,
    "path": "accessories/4550170_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 390,
    "path": "accessories/6058368_0.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 391,
    "path": "accessories/6058368_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 392,
    "path": "accessories/6093532_0.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 393,
    "path": "accessories/6093532_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 394,
    "path": "accessories/6096993_0.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 395,
    "path": "accessories/6096993_1 (1).png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 396,
    "path": "accessories/6096993_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 397,
    "path": "accessories/6116593_0.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 398,
    "path": "accessories/6116593_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 399,
    "path": "accessories/6344738_0.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 400,
    "path": "accessories/6344738_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 401,
    "path": "accessories/6349964_0.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 402,
    "path": "accessories/6349964_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 403,
    "path": "accessories/6359833_0.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 404,
    "path": "accessories/6359833_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 405,
    "path": "accessories/6411593_0.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 406,
    "path": "accessories/6411593_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 407,
    "path": "accessories/6430210_0.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 408,
    "path": "accessories/6430210_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 409,
    "path": "accessories/6492106_0.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 410,
    "path": "accessories/6492106_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 411,
    "path": "accessories/6534695_1 (1).png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 412,
    "path": "accessories/6534695_1 (2).png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 413,
    "path": "accessories/6534695_1.png", 
    "price":0,
    "category":  "accessories"
  },
  {
    "id": 414,
    "path": "base/default_head_0.png", 
    "price":0,
    "category":  "base"
  },
  {
    "id": 415,
    "path": "base/default_legs_0.png", 
    "price":0,
    "category":  "base"
  },
  {
    "id": 416,
    "path": "base/default_legs_1.png", 
    "price":0,
    "category":  "base"
  },
  {
    "id": 417,
    "path": "base/default_torso_0.png", 
    "price":0,
    "category":  "base"
  },
  {
    "id": 418,
    "path": "base/default_torso_1.png", 
    "price":0,
    "category":  "base"
  }
];}
    // Ensure LEGO_PIECES is globally accessible
    if (typeof window.LEGO_PIECES === 'undefined') {
        window.LEGO_PIECES = window.legoPieces;
    }
    console.log('✅ charms.js loaded successfully');
})();

