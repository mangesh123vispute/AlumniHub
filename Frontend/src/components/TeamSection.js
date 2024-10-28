import React from 'react';

const TeamSection = () => {
  return (
    <section id="team" className="team section py-12">
      {/* Section Title */}
      <div className="container mx-auto text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-blue-600">Team</h2>
        <p className="text-gray-600">Our hard working team</p>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div
            className="team-member bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="member-img relative mb-4">
              <img
                src="assets/img/team/team-1.jpg"
                alt="Walter White"
                className="rounded-lg shadow-lg w-full object-cover"
              />
              <div className="social absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-pink-500 hover:text-pink-700">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
            <div className="member-info">
              <h4 className="text-xl font-semibold">Walter White</h4>
              <span className="text-sm text-gray-500">Chief Executive Officer</span>
              <p className="text-gray-600 mt-3">
                Velit aut quia fugit et et. Dolorum ea voluptate vel tempore tenetur ipsa quae aut. Ipsum exercitationem
                iure minima enim corporis et voluptate.
              </p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div
            className="team-member bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="member-img relative mb-4">
              <img
                src="assets/img/team/team-2.jpg"
                alt="Sarah Jhonson"
                className="rounded-lg shadow-lg w-full object-cover"
              />
              <div className="social absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-pink-500 hover:text-pink-700">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
            <div className="member-info">
              <h4 className="text-xl font-semibold">Sarah Jhonson</h4>
              <span className="text-sm text-gray-500">Product Manager</span>
              <p className="text-gray-600 mt-3">
                Quo esse repellendus quia id. Est eum et accusantium pariatur fugit nihil minima suscipit corporis.
                Voluptate sed quas reiciendis animi neque sapiente.
              </p>
            </div>
          </div>

          {/* Team Member 3 */}
          <div
            className="team-member bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="member-img relative mb-4">
              <img
                src="assets/img/team/team-3.jpg"
                alt="William Anderson"
                className="rounded-lg shadow-lg w-full object-cover"
              />
              <div className="social absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-pink-500 hover:text-pink-700">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
            <div className="member-info">
              <h4 className="text-xl font-semibold">William Anderson</h4>
              <span className="text-sm text-gray-500">CTO</span>
              <p className="text-gray-600 mt-3">
                Vero omnis enim consequatur. Voluptas consectetur unde qui molestiae deserunt. Voluptates enim aut
                architecto porro aspernatur molestiae modi.
              </p>
            </div>
          </div>

          {/* Team Member 4 */}
          <div
            className="team-member bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="member-img relative mb-4">
              <img
                src="assets/img/team/team-4.jpg"
                alt="Amanda Jepson"
                className="rounded-lg shadow-lg w-full object-cover"
              />
              <div className="social absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-pink-500 hover:text-pink-700">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
            <div className="member-info">
              <h4 className="text-xl font-semibold">Amanda Jepson</h4>
              <span className="text-sm text-gray-500">Accountant</span>
              <p className="text-gray-600 mt-3">
                Rerum voluptate non adipisci animi distinctio et deserunt amet voluptas. Quia aut aliquid doloremque ut
                possimus ipsum officia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
