const User = require("../models/user");
const Project = require("../models/project");
const Donation = require("../models/donation");

const ImportData = async () => {
  await User.create({
    id: 1,
    name: "Le Quang Trong Nghia",
    avatar:
      "http://localhost:5000/avatar/Le-Quang-Trong-Nghia1682332883425.jpeg",
    address: "22/30 Duong So 6, Binh Tan, HCM",
    phone: "0901234567",
    email: "nghsvn@gmail.com",
    role: "admin",
    password: "$2b$10$qH1VNtmVrAVn1wvk8XrPteKgE.xEheIJ2YEcLuHvIToCgaAEMdzKm",
  });
  await User.create({
    id: 2,
    name: "Anneliese N. Harwell",
    avatar:
      "http://localhost:5000/avatar/Anneliese-N.-Harwell1682332757710.jpeg",
    address: "103 Emily Drive Hampton, SC 29924",
    phone: "803-887-6182",
    email: "AnnelieseNHarwell@armyspy.com",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 3,
    name: "Maria J. Enright",
    avatar: "http://localhost:5000/avatar/Maria-J.-Enright1682332769033.png",
    address: "2200 Christie Way Burlington, MA 01803",
    phone: "978-809-7918",
    email: "MariaJEnright@teleworm.us",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 4,
    name: "Dennis M. Creed",
    avatar: "http://localhost:5000/avatar/Dennis-M.-Creed1682332783732.png",
    address: "131 Lincoln Street Hightstown, NJ 08520",
    phone: "609-443-7699",
    email: "DennisMCreed@rhyta.com",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 5,
    name: "Rosemarie L. Thomas",
    avatar:
      "http://localhost:5000/avatar/Rosemarie-L.-Thomas1682597234814.jpeg",
    address: "511 Private Lane Valdosta, GA 31601",
    phone: "229-269-9032",
    email: "RosemarieLThomas@jourrapide.com",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 6,
    name: "William T. Turner",
    avatar: "http://localhost:5000/avatar/William-T.-Turner1682332824162.jpeg",
    address: "1260 Concord Street Charlotte, NC 28273",
    phone: "704-492-6218",
    email: "WilliamTTurner@dayrep.com",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 7,
    name: "Justin F. Purdy",
    avatar: "http://localhost:5000/avatar/Justin-F.-Purdy1682332838640.jpeg",
    address: "1964 Stone Lane Philadelphia, PA 19103",
    phone: "610-422-0351",
    email: "JustinFPurdy@rhyta.com",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 8,
    name: "Brian T. Baker",
    avatar: "http://localhost:5000/avatar/Brian-T.-Baker1682332862488.jpeg",
    address: "770 Wines Lane Houston, TX 77030",
    phone: "832-355-7489",
    email: "BrianTBaker@rhyta.com",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 9,
    name: "Danny E. Garcia",
    avatar: "http://localhost:5000/avatar/Danny-E.-Garcia1682332905289.jpeg",
    address: "635 Columbia Boulevard Greensboro, MD 21639",
    phone: "410-482-4164",
    email: "DannyEGarcia@rhyta.com",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 10,
    name: "Gail D. Rush",
    avatar: "http://localhost:5000/avatar/Gail-D.-Rush1682332916566.png",
    address: "785 Weekley Street San Antonio, TX 78217",
    phone: "210-295-9505",
    email: "GailDRush@jourrapide.com",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 11,
    name: "Shirley M. Smit",
    avatar: "http://localhost:5000/avatar/Shirley-M.-Smit1682332932834.png",
    address: "1606 Oakwood Avenue New York, NY 1002",
    phone: "212-663-562",
    email: "ShirleyMSmith@jourrapide.co",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 12,
    name: "Anneliese N. Harwel",
    avatar: "http://localhost:5000/avatar/Anneliese-N.-Harwel1682332949321.png",
    address: "103 Emily Drive Hampton, SC 2992",
    phone: "803-887-618",
    email: "AnnelieseNHarwell@armyspy.co",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 13,
    name: "Maria J. Enrigh",
    avatar: "http://localhost:5000/avatar/Maria-J.-Enrigh1682332970569.png",
    address: "2200 Christie Way Burlington, MA 0180",
    phone: "978-809-791",
    email: "MariaJEnright@teleworm.u",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 14,
    name: "Dennis M. Cree",
    avatar: "http://localhost:5000/avatar/Dennis-M.-Cree1682332984179.png",
    address: "131 Lincoln Street Hightstown, NJ 0852",
    phone: "609-443-769",
    email: "DennisMCreed@rhyta.co",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 15,
    name: "Rosemarie L. Thoma",
    avatar: "http://localhost:5000/avatar/Rosemarie-L.-Thoma1682333000089.png",
    address: "511 Private Lane Valdosta, GA 3160",
    phone: "229-269-903",
    email: "RosemarieLThomas@jourrapide.co",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 16,
    name: "William T. Turne",
    avatar: "http://localhost:5000/avatar/William-T.-Turne1682333013440.png",
    address: "1260 Concord Street Charlotte, NC 2827",
    phone: "704-492-621",
    email: "WilliamTTurner@dayrep.c",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 17,
    name: "Justin F. Purd",
    avatar: "http://localhost:5000/avatar/Justin-F.-Purd1682333022821.png",
    address: "1964 Stone Lane Philadelphia, PA 1910",
    phone: "610-422-035",
    email: "JustinFPurdy@rhyta.co",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 18,
    name: "Brian T. Bake",
    avatar: "http://localhost:5000/avatar/Brian-T.-Bake1682333036600.png",
    address: "770 Wines Lane Houston, TX 7703",
    phone: "832-355-748",
    email: "BrianTBaker@rhyta.c",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 19,
    name: "Danny E. Garci",
    avatar: "http://localhost:5000/avatar/Gail-D.-Rus1682333046877.png",
    address: "635 Columbia Boulevard Greensboro, MD 2163",
    phone: "410-482-416",
    email: "DannyEGarcia@rhyta.co",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 20,
    name: "Gail D. Rus",
    avatar: "http://localhost:5000/avatar/Van-Lam1682333620410.jpeg",
    address: "785 Weekley Street San Antonio, TX 7821",
    phone: "210-295-950",
    email: "GailDRush@jourrapide.c",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });
  await User.create({
    id: 21,
    name: "Shirley M. Smith",
    avatar: "http://localhost:5000/avatar/ln3003vn@gmail.com1682597004095.jpeg",
    address: "1606 Oakwood Avenue New York, NY 10025",
    phone: "212-663-5623",
    email: "ShirleyMSmith@jourrapide.com",
    password: "$2b$10$wg7h3V.8dmT6aiGZT.Wg6uCDOTcPtEK6s2xLirPsFkWWAcaZg52pe",
  });

  const user1 = await User.findByPk(1);
  await user1.createProject({
    id: 1,
    name: "Support Education for Children in Need",
    image:
      "http://localhost:5000/images/Support-Education-for-Children-in-Need1680694254805.png",
    description:
      "Help provide education to children in need by donating to our cause. Your donation will go towards providing school supplies, textbooks, and teacher salaries for children who would not have access to education otherwise",
    goal: 27000,
    start_date: "2023-03-26 14:00:19",
    end_date: "2023-04-26 14:00:19",
    status: "open",
  });
  await user1.createDonation({
    id: 1,
    amount: 8095,
    donate_date: "2023-03-26 14:00:19",
    payment_method: "bank",
    project_id: 1,
  });
  const user2 = await User.findByPk(2);
  await user2.createProject({
    id: 2,
    name: "Books for Underprivileged Children",
    image:
      "http://localhost:5000/images/Books-for-Underprivileged-Children1680694272995.png",
    description:
      "This fundraiser aims to provide new and gently used books to underprivileged children in the local community. The goal is to promote literacy and encourage a love for reading among children who may not have access to books at home or in school. With your donation, we can help improve the educational opportunities and future prospects of these children.",
    goal: 30000,
    start_date: "2023-03-26 19:00:00",
    end_date: "2023-05-28 14:00:19",
    status: "open",
  });
  await user2.createDonation({
    id: 2,
    amount: 12010,
    donate_date: "2023-03-22 11:00:10",
    payment_method: "paypal",
    project_id: 2,
  });
  const user3 = await User.findByPk(3);
  await user3.createProject({
    id: 3,
    name: "Education for All",
    image: "http://localhost:5000/images/Education-for-All1680694112314.png",
    description:
      "Our organization is committed to providing access to education for children in low-income communities around the world. By donating to our cause, you are helping to provide resources such as textbooks, school supplies, and teacher salaries, as well as supporting the construction of new school facilities.",
    goal: 30000,
    start_date: "2023-03-24 15:30:00",
    end_date: "2023-07-20 20:00:00",
    status: "open",
  });
  await user3.createDonation({
    id: 3,
    amount: 30860,
    donate_date: "2023-03-21 10:00:00",
    payment_method: "bank",
    project_id: 3,
  });
  const user4 = await User.findByPk(4);
  await user4.createProject({
    id: 4,
    name: "School Supplies Drive",
    image:
      "http://localhost:5000/images/School-Supplies-Drive1680694137875.png",
    description:
      "Help us support local students in need by donating school supplies! Our goal is to provide backpacks filled with essential items such as notebooks, pencils, pens, and more to students who may not have the resources to purchase these items on their own",
    goal: 200000,
    start_date: "2023-03-26 15:00:00",
    end_date: "2023-09-26 14:30:19",
    status: "open",
  });
  await user4.createDonation({
    id: 4,
    amount: 102010,
    donate_date: "2023-03-19 02:00:00",
    payment_method: "paypal",
    project_id: 4,
  });
  const user5 = await User.findByPk(5);
  await user5.createProject({
    id: 5,
    name: "Books for Students",
    image: "http://localhost:5000/images/Books-for-Students1680694163485.png",
    description:
      "Help us provide much-needed educational resources for students in underfunded schools. With your donation, we can purchase books for classrooms and school libraries, giving children access to reading materials that will enrich their education and inspire a love for learning",
    goal: 100000,
    start_date: "2023-03-15 16:00:00",
    end_date: "2023-10-26 16:00:00",
    status: "open",
  });
  await user5.createDonation({
    id: 5,
    amount: 56000,
    donate_date: "2023-03-18 11:00:00",
    payment_method: "bank",
    project_id: 5,
  });
  const user6 = await User.findByPk(6);
  await user6.createProject({
    id: 6,
    name: "Clean Water for Rural Communities",
    image:
      "http://localhost:5000/images/Clean-Water-for-Rural-Communities1680694188621.png",
    description:
      "Many rural communities in developing countries lack access to clean water. As a result, people in these communities often suffer from waterborne illnesses, which can be life-threatening. Our fundraiser aims to provide clean water to these communities by building wells and water treatment facilities.",
    goal: 60000,
    start_date: "2023-03-17 00:00:00",
    end_date: "2023-06-17 00:00:00",
    status: "open",
  });
  await user6.createDonation({
    id: 6,
    amount: 16010,
    donate_date: "2023-03-15 08:00:00",
    payment_method: "paypal",
    project_id: 6,
  });
  const user7 = await User.findByPk(7);
  await user7.createProject({
    id: 7,
    name: "Hope for Education",
    image: "http://localhost:5000/images/Hope-for-Education1680694211621.png",
    description:
      "Your donation to Hope for Education will help provide education and resources to children in underprivileged communities. With your support, we can ensure that every child has access to the education they need to reach their full potential.",
    goal: 170000,
    start_date: "2023-03-12 12:00:19",
    end_date: "2023-06-12 12:00:19",
    status: "open",
  });
  await user7.createDonation({
    id: 7,
    amount: 2900,
    donate_date: "2023-03-01 07:00:00",
    payment_method: "bank",
    project_id: 7,
  });
  const user8 = await User.findByPk(8);
  await user8.createProject({
    id: 8,
    name: "Help Build a School in Rural Nepal",
    image:
      "http://localhost:5000/images/Help-Build-a-School-in-Rural-Nepal1680694228840.png",
    description:
      "Our organization is dedicated to improving access to education in rural areas of Nepal, where children often have to walk long distances to attend school. With your donation, we will be able to build a new school in a remote village and provide educational resources for the students.",
    goal: 14000,
    start_date: "2023-03-09 13:00:00",
    end_date: "2023-07-09 13:00:00",
    status: "open",
  });
  await user8.createDonation({
    id: 8,
    amount: 1000,
    donate_date: "2023-03-02 16:00:00",
    payment_method: "paypal",
    project_id: 8,
  });
  const user9 = await User.findByPk(9);
  await user9.createProject({
    id: 9,
    name: "Clean Water for All",
    image: "http://localhost:5000/images/Clean-Water-for-All1680694053537.png",
    description:
      "The Clean Water for All donation aims to provide clean and safe drinking water to communities in need around the world. With 785 million people still lacking access to basic drinking water, this donation will make a significant impact in improving public health, reducing poverty, and promoting sustainable development.",
    goal: 14000,
    start_date: "2023-03-05 19:30:00",
    end_date: "2023-09-05 20:00:00",
    status: "open",
  });
  await user9.createDonation({
    id: 9,
    amount: 250,
    donate_date: "2023-03-04 20:00:19",
    payment_method: "bank",
    project_id: 9,
  });
  const user10 = await User.findByPk(10);
  await user10.createProject({
    id: 10,
    name: "Flood Relief Fund",
    image: "http://localhost:5000/images/Flood-Relief-Fund1680694091048.png",
    description:
      "The Flood Relief Fund aims to provide financial assistance and relief to those affected by the recent floods. With your donation, we will be able to provide aid to individuals and families who have lost their homes, belongings, and livelihoods due to the flood.",
    goal: 19000,
    start_date: "2023-03-18 10:00:00",
    end_date: "2023-05-18 10:00:00",
    status: "open",
  });
  await user10.createDonation({
    id: 10,
    amount: 300,
    donate_date: "2023-03-05 21:00:19",
    payment_method: "paypal",
    project_id: 10,
  });
  await user10.createDonation({
    id: 11,
    amount: 50,
    donate_date: "2023-03-06 21:00:19",
    payment_method: "paypal",
    project_id: 10,
  });
};

module.exports = ImportData;
