<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CraftsmanSeeder extends Seeder
{
    public function run(): void
    {
        $craftsmen = [
            ['name' => 'Ahmad Khalil', 'specialty' => 'Electrician', 'city' => 'Amman', 'experience_years' => 8],
            ['name' => 'Mohammed Nasser', 'specialty' => 'Plumber', 'city' => 'Zarqa', 'experience_years' => 5],
            ['name' => 'Khalid Ibrahim', 'specialty' => 'Carpenter', 'city' => 'Irbid', 'experience_years' => 10],
            ['name' => 'Samir Haddad', 'specialty' => 'Painter', 'city' => 'Amman', 'experience_years' => 6],
            ['name' => 'Tariq Mansour', 'specialty' => 'AC Technician', 'city' => 'Aqaba', 'experience_years' => 7],
            ['name' => 'Rami Saleh', 'specialty' => 'Tiler', 'city' => 'Amman', 'experience_years' => 4],
            ['name' => 'Fadi Awad', 'specialty' => 'Welder', 'city' => 'Zarqa', 'experience_years' => 9],
            ['name' => 'Nour Qasim', 'specialty' => 'Electrician', 'city' => 'Irbid', 'experience_years' => 3],
            ['name' => 'Bilal Freij', 'specialty' => 'Plumber', 'city' => 'Amman', 'experience_years' => 11],
            ['name' => 'Omar Subhi', 'specialty' => 'Carpenter', 'city' => 'Madaba', 'experience_years' => 6],
            ['name' => 'Yousef Darwish', 'specialty' => 'Painter', 'city' => 'Amman', 'experience_years' => 5],
            ['name' => 'Hassan Karimi', 'specialty' => 'AC Technician', 'city' => 'Zarqa', 'experience_years' => 8],
            ['name' => 'Walid Suleiman', 'specialty' => 'Tiler', 'city' => 'Irbid', 'experience_years' => 7],
            ['name' => 'Ziad Hamdan', 'specialty' => 'Welder', 'city' => 'Amman', 'experience_years' => 12],
            ['name' => 'Bassam Najjar', 'specialty' => 'Electrician', 'city' => 'Aqaba', 'experience_years' => 4],
            ['name' => 'Imad Rashid', 'specialty' => 'Plumber', 'city' => 'Amman', 'experience_years' => 9],
            ['name' => 'Samer Barakat', 'specialty' => 'Carpenter', 'city' => 'Zarqa', 'experience_years' => 6],
            ['name' => 'Ayman Houri', 'specialty' => 'Painter', 'city' => 'Irbid', 'experience_years' => 3],
            ['name' => 'Mazen Tabbara', 'specialty' => 'Gypsum Worker', 'city' => 'Amman', 'experience_years' => 7],
            ['name' => 'Nidal Khoury', 'specialty' => 'AC Technician', 'city' => 'Madaba', 'experience_years' => 5],
            ['name' => 'Raed Jaber', 'specialty' => 'Tiler', 'city' => 'Amman', 'experience_years' => 10],
            ['name' => 'Adel Musa', 'specialty' => 'Welder', 'city' => 'Zarqa', 'experience_years' => 8],
            ['name' => 'Khaled Issa', 'specialty' => 'Electrician', 'city' => 'Irbid', 'experience_years' => 6],
            ['name' => 'Saad Othman', 'specialty' => 'Plumber', 'city' => 'Amman', 'experience_years' => 4],
            ['name' => 'Jawad Nassar', 'specialty' => 'Carpenter', 'city' => 'Aqaba', 'experience_years' => 9],
            ['name' => 'Emad Zureiq', 'specialty' => 'Painter', 'city' => 'Amman', 'experience_years' => 5],
            ['name' => 'Fares Malkawi', 'specialty' => 'Gypsum Worker', 'city' => 'Zarqa', 'experience_years' => 7],
            ['name' => 'Tamer Habib', 'specialty' => 'AC Technician', 'city' => 'Irbid', 'experience_years' => 11],
            ['name' => 'Nasser Qudah', 'specialty' => 'Tiler', 'city' => 'Amman', 'experience_years' => 6],
            ['name' => 'Amjad Sweidan', 'specialty' => 'Welder', 'city' => 'Madaba', 'experience_years' => 8],
            ['name' => 'Louay Badran', 'specialty' => 'Electrician', 'city' => 'Amman', 'experience_years' => 3],
            ['name' => 'Wissam Khalaf', 'specialty' => 'Plumber', 'city' => 'Zarqa', 'experience_years' => 7],
            ['name' => 'Hani Sabbagh', 'specialty' => 'Carpenter', 'city' => 'Irbid', 'experience_years' => 5],
            ['name' => 'Jihad Hammoud', 'specialty' => 'Painter', 'city' => 'Amman', 'experience_years' => 9],
            ['name' => 'Munir Asmar', 'specialty' => 'Gypsum Worker', 'city' => 'Aqaba', 'experience_years' => 4],
            ['name' => 'Ramzi Shaaban', 'specialty' => 'AC Technician', 'city' => 'Amman', 'experience_years' => 6],
            ['name' => 'Ghassan Najem', 'specialty' => 'Tiler', 'city' => 'Zarqa', 'experience_years' => 10],
            ['name' => 'Marwan Qassab', 'specialty' => 'Welder', 'city' => 'Irbid', 'experience_years' => 7],
            ['name' => 'Tarek Hadidi', 'specialty' => 'Electrician', 'city' => 'Amman', 'experience_years' => 5],
            ['name' => 'Anas Zahrawi', 'specialty' => 'Plumber', 'city' => 'Madaba', 'experience_years' => 8],
            ['name' => 'Majd Halabi', 'specialty' => 'Carpenter', 'city' => 'Amman', 'experience_years' => 6],
            ['name' => 'Issam Rajab', 'specialty' => 'Painter', 'city' => 'Zarqa', 'experience_years' => 4],
            ['name' => 'Wael Diab', 'specialty' => 'Gypsum Worker', 'city' => 'Irbid', 'experience_years' => 9],
            ['name' => 'Hazem Masri', 'specialty' => 'AC Technician', 'city' => 'Amman', 'experience_years' => 7],
            ['name' => 'Shadi Barghout', 'specialty' => 'Tiler', 'city' => 'Aqaba', 'experience_years' => 5],
            ['name' => 'Bassem Husseini', 'specialty' => 'Welder', 'city' => 'Amman', 'experience_years' => 11],
            ['name' => 'Karim Sabbah', 'specialty' => 'Electrician', 'city' => 'Zarqa', 'experience_years' => 6],
            ['name' => 'Nabil Qattan', 'specialty' => 'Plumber', 'city' => 'Irbid', 'experience_years' => 8],
            ['name' => 'Osama Halaweh', 'specialty' => 'Carpenter', 'city' => 'Amman', 'experience_years' => 3],
            ['name' => 'Yahya Samara', 'specialty' => 'Painter', 'city' => 'Madaba', 'experience_years' => 7],
        ];

        foreach ($craftsmen as $index => $data) {
            User::create([
                'name' => $data['name'],
                'email' => 'craftsman' . ($index + 1) . '@san3a.com',
                'password' => Hash::make('password123'),
                'role' => 'craftsman',
                'specialty' => $data['specialty'],
                'city' => $data['city'],
                'experience_years' => $data['experience_years'],
                'availability' => collect(['available', 'busy', 'unavailable'])->random(),
                'bio' => $data['experience_years'] . ' years of experience in ' . $data['specialty'] . ' based in ' . $data['city'] . '.',
            ]);
        }
    }
}