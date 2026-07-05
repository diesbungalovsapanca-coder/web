import type { MediaCategory } from "@/types/media";

export interface MediaCuration {
  title: string;
  category: MediaCategory;
  alt?: string;
  isActive?: boolean;
  /** Ana sayfa vitrininde (MediaShowcase) gösterilecek seçki. */
  isFeatured?: boolean;
}

/**
 * İçerik küratörlüğü: Instagram arşivinden gelen dosyalara elle atanmış
 * başlık ve kategori. Anahtar, dosya adındaki Instagram medya ID'sidir.
 * `scripts/generate-media-manifest.ts` bu haritayı manifest üretirken uygular;
 * haritada olmayan dosyalar otomatik başlık ve "details" kategorisi alır.
 */
export const mediaCuration: Record<string, MediaCuration> = {
  // Videolar
  "17857063260384658": { title: "A-frame bungalov ve özel havuza genel bakış", category: "hero" , isFeatured: true },
  "17946847965140324": { title: "Özel havuz ve güneşlenme terası", category: "pool-jacuzzi" , isFeatured: true },
  "17963601230869135": { title: "Bungalov dış görünümü ve bahçe", category: "exterior" },
  "18021716747657311": { title: "Karlar altında DİES Bungalov (havadan)", category: "winter", isFeatured: true },
  "18024812318631340": { title: "Bahçe ve kamelya alanında akşamüstü", category: "exterior" },
  "18025018655444380": { title: "Havuz başında yaz keyfi", category: "pool-jacuzzi" },
  "18032019185424440": { title: "Dış alan turu: bungalov ve havuz", category: "exterior" },
  "18046084115190635": { title: "Yatakta kitap keyfi ve orman manzarası", category: "interior" },
  "18054428567486721": { title: "Romantik kutlamalar için özel hazırlık", category: "details" },
  // "Woodlux" filigranı taşıyor — içerik sahibi teyit edene kadar pasif.
  "18058225529386229": { title: "Havuzlu dış alandan görüntüler", category: "exterior", isActive: false },
  "18058876001124985": { title: "Sapanca doğası ve gökyüzü", category: "exterior" },
  "18061266571856319": { title: "Açık jakuzide ikram sunumu", category: "pool-jacuzzi" },
  "18068779094318336": { title: "Havuz ve ahşap teras", category: "pool-jacuzzi" },
  "18069534742785429": { title: "Bungalov dış alanı", category: "exterior" },
  "18153457135329106": { title: "Havadan bakış: orman içindeki bungalovlar", category: "exterior" },
  "18301101097215281": { title: "Bahçede leylek ziyareti: havuz ve yeşillik", category: "exterior", isFeatured: true },
  // Videoya gömülü "son 3 gün" kampanya metni güncelliğini yitirdi — güncel kampanya videosu gelene kadar pasif.
  "18492428848005380": { title: "Erken rezervasyon kampanyası", category: "uncategorized", isActive: false },
  "18502885297048891": { title: "Bahçe peyzajı ve mahremiyet detayları", category: "details" },

  // Fotoğraflar
  "17858241420382342": { title: "Üst kattan salon görünümü", category: "interior" },
  "17869176129532566": { title: "Yılbaşı dekorasyonu", category: "details" },
  "17870567310268412": { title: "Salon ve çatı katı merdiveni", category: "interior" },
  "17877553398268596": { title: "Avize detayı ve oturma alanı", category: "interior" },
  "17891915832192943": { title: "Havuz kenarı oturma alanı ve bahçe", category: "pool-jacuzzi" },
  "17904600672161786": { title: "Havuz kenarında kahvaltı sunumu", category: "pool-jacuzzi" , isFeatured: true },
  "17925800229019399": { title: "Ahşap ateş çukuru ve oturma alanı", category: "details" },
  "17926175391040171": { title: "Karlı bahçe (havadan)", category: "winter" },
  "17930267411994556": { title: "Çatı katı yatak odası ve üçgen pencere", category: "interior" , isFeatured: true },
  "17935185146881065": { title: "Siyah cam detaylı duş alanı", category: "interior" },
  "17963429255866783": { title: "İkiz yataklı oda", category: "interior" },
  "17964777065723213": { title: "Salon, mutfak ve çatı katı merdiveni", category: "interior" , isFeatured: true },
  "17965461812717758": { title: "Banyo lavabo ünitesi", category: "interior" },
  "17995718876772126": { title: "Banyo ve duş alanı", category: "interior" },
  "18001465877546062": { title: "Çatı katı yatak odası", category: "interior" },
  "18008418464531159": { title: "Ankastre mutfak alanı", category: "interior" },
  "18018888788665622": { title: "Salon: avize ve oturma grubu", category: "interior" },
  "18022737359448546": { title: "Kar altında havuz ve bahçe", category: "winter" },
  "18025366580382745": { title: "Bahçede güneşlenme şezlongları", category: "exterior" },
  "18025367132394322": { title: "Banyo lavabo detayı", category: "interior" },
  "18025499111387003": { title: "Mutfak tezgâhı ve davlumbaz", category: "interior" },
  "18030739868328006": { title: "Bahçedeki barbekü şöminesi", category: "details" },
  "18036394424234639": { title: "Yatak odası ve üçgen manzara penceresi", category: "interior" },
  "18038857721601463": { title: "Kahve makinesi ve mutfak köşesi", category: "interior" },
  "18039535076438537": { title: "Karlı günde havuz (havadan)", category: "winter" , isFeatured: true },
  "18044904785520652": { title: "Ahşap teras ve dinlenme alanı", category: "exterior" },
  "18047115356088151": { title: "DİES Bungalov Sapanca logosu", category: "logo" },
  "18056907877891718": { title: "Üst kattan salon ve dekoratif avize", category: "interior" },
  "18057881237281283": { title: "Banyo dolabı ve havlu düzeni", category: "interior" },
  "18059393851767235": { title: "İkiz yataklı oda ve TV", category: "interior" },
  "18059956990901607": { title: "Yemek masası ve mutfak", category: "interior" },
  "18060383704993708": { title: "Sarı tonlarda ikiz yataklı oda", category: "interior" },
  "18061515286815071": { title: "İkiz yataklı odadan detay", category: "interior" },
  "18062160787947577": { title: "Mutfak köşesi ve raf ünitesi", category: "interior" },
  "18063293623784914": { title: "Ocak ve davlumbaz detayı", category: "interior" },
  "18068685763852906": { title: "Bahçe yolunda barbekü şöminesi", category: "details" },
  "18068866561708740": { title: "Ateş çukuru ve ahşap oturma alanı", category: "details" , isFeatured: true },
  "18071619247670211": { title: "A-frame bungalov ve havuz", category: "exterior" },
  "18073155706643840": { title: "Salon oturma grubu", category: "interior" },
  "18074200258769317": { title: "Beyaz mutfak ünitesi", category: "interior" },
  "18074819407706574": { title: "İç mekân jakuzi ve havlu sunumu", category: "pool-jacuzzi" , isFeatured: true },
  "18075538247272277": { title: "Boş kare", category: "uncategorized", isActive: false },
  "18077890012725369": { title: "Yatak odası ve üçgen pencere", category: "interior" },
  "18088075384577208": { title: "Kar altında tesis (havadan)", category: "winter" },
  "18089831134996457": { title: "Romantik kutlama masası: mumlar ve süsleme", category: "details", isFeatured: true },
  "18090009523569781": { title: "Banyo ve duş", category: "interior" },
  "18102519104023188": { title: "Boş kare", category: "uncategorized", isActive: false },
  "18111350152462529": { title: "Karlı bahçe ve havuz (havadan)", category: "winter" },
  "18115165900439519": { title: "Koridor ve tablo detayı", category: "interior" },
  "18268715146271813": { title: "Havuz kenarı şezlong ve gölgelik", category: "pool-jacuzzi" , isFeatured: true },
  "18292016443240784": { title: "Bahçeden bungalov görünümü", category: "exterior" },
  "18298036930210422": { title: "Ateş çukuru oturma alanı", category: "details" },
  "18354078643182584": { title: "Banyo lavabo ünitesi ve havlular", category: "interior" },
  "18363211609192502": { title: "Çatı katı yatak odası", category: "interior" },
  "18373764121187641": { title: "Üst kattan salon görünümü", category: "interior" },
  "18385044340117795": { title: "Karlı günde havuz ve bahçe", category: "winter" },
  "18459873994068495": { title: "Barbekü şöminesi ve bahçe", category: "details" },
  "18484938055025521": { title: "Salon oturma grubu (üstten)", category: "interior" }
};
